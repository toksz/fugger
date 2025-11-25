import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Service role client for server-side operations
export const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// API client for RESOURCES game API
export class ResourcesApiClient {
  private apiKey: string
  private requests: Map<number, number> = new Map()
  private rateLimit = 60 // requests per hour
  private retryDelay = 1000

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async makeRequest(queryId: number, days: number = 10): Promise<any> {
    // Rate limiting
    const now = Date.now()
    const hourAgo = now - (60 * 60 * 1000)

    // Clean old requests
    for (const [timestamp, count] of this.requests.entries()) {
      if (timestamp < hourAgo) {
        this.requests.delete(timestamp)
      }
    }

    if (this.requests.size >= this.rateLimit) {
      throw new Error('API rate limit exceeded. Please try again later.')
    }

    const maxRetries = 3
    let attempt = 0

    while (attempt < maxRetries) {
      try {
        const url = `https://api.resources-game.ch/?q=${queryId}&f=1&k=${this.apiKey}&l=en&d=${days}`
        const response = await fetch(url)

        if (!response.ok) {
          if (response.status === 429) {
            // Rate limited, wait and retry
            await new Promise(resolve => setTimeout(resolve, this.retryDelay))
            this.retryDelay *= 2
            attempt++
            continue
          }
          throw new Error(`API error: ${response.status}`)
        }

        // Track successful request
        this.requests.set(now, (this.requests.get(now) || 0) + 1)
        this.retryDelay = 1000

        return await response.json()

      } catch (error) {
        if (attempt === maxRetries - 1) throw error
        attempt++
        await new Promise(resolve => setTimeout(resolve, this.retryDelay))
        this.retryDelay *= 2
      }
    }
  }

  // Sync user data with retry logic
  async syncUserData(userId: string, syncTypes?: string[]): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('sync-user-data', {
        body: { userId, syncTypes }
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Sync error:', error)
      throw error
    }
  }

  // Get cached user data
  async getUserData(userId: string, dataType: string, limit?: number, offset?: number) {
    try {
      const params = new URLSearchParams({
        userId,
        dataType,
        ...(limit && { limit: limit.toString() }),
        ...(offset && { offset: offset.toString() })
      })

      const { data, error } = await supabase.functions.invoke('get-user-data', {
        body: {},
        headers: {
          'x-custom-params': params.toString()
        }
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get data error:', error)
      throw error
    }
  }
}

// Utility functions
export const auth = {
  signUp: async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Market data
  getMarketPrices: async (limit = 50) => {
    const { data, error } = await supabase
      .from('market_prices')
      .select('*')
      .order('unix_timestamp', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // User data
  getUserFactories: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_factories')
      .select('*')
      .eq('user_id', userId)
      .order('last_sync', { ascending: false })
    return { data, error }
  },

  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateUserProfile: async (userId: string, updates: Record<string, any>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    return { data, error }
  }
}