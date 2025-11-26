import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // 1. Setup CORS headers (Optional but recommended for browser requests)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Initialize Supabase Client with the User's Auth Token
    // We use the ANON key, not the SERVICE_ROLE key, to respect RLS policies.
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // 3. Authenticate the User
    // Get the user from the token sent in the request header
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 4. Parse Request Parameters
    const url = new URL(req.url)
    // SECURE: Use the authenticated user's ID, not the one from URL params
    const userId = user.id 
    const dataType = url.searchParams.get('dataType')
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    if (!dataType) {
      return new Response(JSON.stringify({
        error: 'Missing required parameter: dataType'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 5. Execute Query
    // RLS policies in the database will now automatically apply to these queries
    let query
    
    switch (dataType) {
      case 'factories':
        query = supabase
          .from('user_factories')
          .select('*')
          .eq('user_id', userId)
          .order('last_sync', { ascending: false })
        break

      case 'warehouses':
        query = supabase
          .from('user_warehouses')
          .select('*')
          .eq('user_id', userId)
          .order('last_sync', { ascending: false })
        break

      case 'mines':
        query = supabase
          .from('user_mines')
          .select('*')
          .eq('user_id', userId)
          .order('last_sync', { ascending: false })
        break

      case 'specialBuildings':
        query = supabase
          .from('user_special_buildings')
          .select('*')
          .eq('user_id', userId)
          .order('last_sync', { ascending: false })
        break

      case 'headquarters':
        query = supabase
          .from('user_headquarters')
          .select('*')
          .eq('user_id', userId)
          .order('last_sync', { ascending: false })
        break

      case 'tradeLogs':
        query = supabase
          .from('user_trade_logs')
          .select('*')
          .eq('user_id', userId)
          .order('trade_date', { ascending: false })
          .limit(limit)
          .range(offset, offset + limit - 1)
        break

      case 'attackLogs':
        query = supabase
          .from('user_attack_logs')
          .select('*')
          .eq('user_id', userId)
          .order('attack_date', { ascending: false })
          .limit(limit)
          .range(offset, offset + limit - 1)
        break

      case 'missions':
        query = supabase
          .from('user_missions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
        break

      case 'achievements':
        query = supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', userId)
          .order('unlocked_at', { ascending: false })
        break

      default:
        return new Response(JSON.stringify({
          error: `Unsupported data type: ${dataType}`
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({
      success: true,
      data: data || [],
      count: data?.length || 0,
      dataType,
      userId, // Confirming back the authenticated ID
      pagination: {
        limit,
        offset,
        hasMore: data && data.length === limit
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Get user data error:', error)
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }, // Note: Add corsHeaders here if you want errors to be readable by browser
    })
  }
})