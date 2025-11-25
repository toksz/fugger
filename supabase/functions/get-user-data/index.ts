import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface GetDataRequest {
  userId: string
  dataType: string
  limit?: number
  offset?: number
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    const dataType = url.searchParams.get('dataType')
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    if (!userId || !dataType) {
      return new Response(JSON.stringify({
        error: 'Missing required parameters: userId and dataType'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let query
    let tableName = `user_${dataType}`

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
          headers: { 'Content-Type': 'application/json' },
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
      userId,
      pagination: {
        limit,
        offset,
        hasMore: data && data.length === limit
      }
    }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Get user data error:', error)
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})