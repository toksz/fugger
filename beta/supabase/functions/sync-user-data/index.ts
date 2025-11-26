import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface SyncRequest {
  userId: string
  syncTypes?: string[] // Optional: specify which data to sync
}

class ResourcesApiClient {
  constructor(private apiKey: string) {}

  async makeRequest(queryId: number, days: number = 10): Promise<any> {
    const maxRetries = 3
    let attempt = 0
    let delay = 1000

    while (attempt < maxRetries) {
      try {
        const url = `https://api.resources-game.ch/?q=${queryId}&f=1&k=${this.apiKey}&l=en&d=${days}`
        const response = await fetch(url)

        if (!response.ok) {
          if (response.status === 429) {
            // Rate limited, wait and retry
            await new Promise(resolve => setTimeout(resolve, delay))
            delay *= 2
            attempt++
            continue
          }
          throw new Error(`API error: ${response.status}`)
        }

        return await response.json()

      } catch (error) {
        if (attempt === maxRetries - 1) throw error
        attempt++
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2
      }
    }
  }
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const { userId, syncTypes }: SyncRequest = await req.json()

    if (!userId) {
      throw new Error('User ID is required')
    }

    // Get user profile and API key
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('api_key, subscription_tier')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      throw new Error('User profile not found')
    }

    if (!profile.api_key) {
      throw new Error('No API key configured for user')
    }

    const apiClient = new ResourcesApiClient(profile.api_key)
    const syncResults = {
      factories: 0,
      warehouses: 0,
      mines: 0,
      specialBuildings: 0,
      headquarters: 0,
      tradeLogs: 0,
      attackLogs: 0,
      missions: 0,
      maintenanceLogs: 0,
      achievements: 0,
      monetaryItems: 0
    }

    // Determine what to sync
    const allSyncTypes = [
      'factories', 'warehouses', 'mines', 'specialBuildings',
      'headquarters', 'tradeLogs', 'attackLogs', 'missions',
      'maintenanceLogs', 'achievements', 'monetaryItems'
    ]
    const typesToSync = syncTypes || allSyncTypes

    // Sync factories (query 1)
    if (typesToSync.includes('factories')) {
      try {
        const factories = await apiClient.makeRequest(1)
        if (Array.isArray(factories)) {
          for (const factory of factories) {
            await supabase.from('user_factories').upsert({
              user_id: userId,
              factory_id: factory.factoryID,
              name: factory.name,
              level: parseInt(factory.lvl) || 1,
              strike_status: factory.strike || 'no'
            })
          }
          syncResults.factories = factories.length
        }
      } catch (error) {
        console.error('Factory sync error:', error)
      }
    }

    // Sync warehouses (query 2)
    if (typesToSync.includes('warehouses')) {
      try {
        const warehouses = await apiClient.makeRequest(2)
        if (Array.isArray(warehouses)) {
          for (const warehouse of warehouses) {
            await supabase.from('user_warehouses').upsert({
              user_id: userId,
              warehouse_id: warehouse.warehouseID,
              name: warehouse.name,
              credits: parseInt(warehouse.credits) || 0,
              capacity: parseInt(warehouse.capacity) || 1000,
              used: parseInt(warehouse.used) || 0
            })
          }
          syncResults.warehouses = warehouses.length
        }
      } catch (error) {
        console.error('Warehouse sync error:', error)
      }
    }

    // Sync mines (query 5)
    if (typesToSync.includes('mines')) {
      try {
        const mines = await apiClient.makeRequest(5)
        if (Array.isArray(mines)) {
          for (const mine of mines) {
            await supabase.from('user_mines').upsert({
              user_id: userId,
              mine_type: mine.type,
              level: parseInt(mine.level) || 1,
              production_rate: parseFloat(mine.productionRate) || 0
            })
          }
          syncResults.mines = mines.length
        }
      } catch (error) {
        console.error('Mine sync error:', error)
      }
    }

    // Sync special buildings (query 3)
    if (typesToSync.includes('specialBuildings')) {
      try {
        const buildings = await apiClient.makeRequest(3)
        if (Array.isArray(buildings)) {
          for (const building of buildings) {
            await supabase.from('user_special_buildings').upsert({
              user_id: userId,
              building_id: building.buildingID,
              name: building.name,
              level: parseInt(building.level) || 1
            })
          }
          syncResults.specialBuildings = buildings.length
        }
      } catch (error) {
        console.error('Special buildings sync error:', error)
      }
    }

    // Sync HQ progress (query 4)
    if (typesToSync.includes('headquarters')) {
      try {
        const hqData = await apiClient.makeRequest(4)
        if (hqData && typeof hqData === 'object') {
          await supabase.from('user_headquarters').upsert({
            user_id: userId,
            progress_level: parseInt(hqData.level) || 1,
            current_xp: parseInt(hqData.xp) || 0
          })
          syncResults.headquarters = 1
        }
      } catch (error) {
        console.error('HQ sync error:', error)
      }
    }

    // Sync trade logs (query 6)
    if (typesToSync.includes('tradeLogs')) {
      try {
        const tradeLogs = await apiClient.makeRequest(6, 7) // Last 7 days
        if (Array.isArray(tradeLogs)) {
          for (const log of tradeLogs) {
            await supabase.from('user_trade_logs').insert({
              user_id: userId,
              trade_data: log
            })
          }
          syncResults.tradeLogs = tradeLogs.length
        }
      } catch (error) {
        console.error('Trade logs sync error:', error)
      }
    }

    // Sync attack logs (query 9)
    if (typesToSync.includes('attackLogs')) {
      try {
        const attackLogs = await apiClient.makeRequest(9, 7) // Last 7 days
        if (Array.isArray(attackLogs)) {
          for (const log of attackLogs) {
            await supabase.from('user_attack_logs').insert({
              user_id: userId,
              attack_data: log
            })
          }
          syncResults.attackLogs = attackLogs.length
        }
      } catch (error) {
        console.error('Attack logs sync error:', error)
      }
    }

    // Sync missions (query 10)
    if (typesToSync.includes('missions')) {
      try {
        const missions = await apiClient.makeRequest(10)
        if (Array.isArray(missions)) {
          for (const mission of missions) {
            await supabase.from('user_missions').upsert({
              user_id: userId,
              mission_data: mission,
              status: mission.status || 'active'
            }, { onConflict: 'user_id,mission_data->>id' })
          }
          syncResults.missions = missions.length
        }
      } catch (error) {
        console.error('Missions sync error:', error)
      }
    }

    // Sync maintenance logs (query 11)
    if (typesToSync.includes('maintenanceLogs')) {
      try {
        const logs = await apiClient.makeRequest(11, 7) // Last 7 days
        if (Array.isArray(logs)) {
          for (const log of logs) {
            await supabase.from('user_maintenance_logs').insert({
              user_id: userId,
              log_data: log
            })
          }
          syncResults.maintenanceLogs = logs.length
        }
      } catch (error) {
        console.error('Maintenance logs sync error:', error)
      }
    }

    // Sync achievements (query 12)
    if (typesToSync.includes('achievements')) {
      try {
        const achievements = await apiClient.makeRequest(12)
        if (Array.isArray(achievements)) {
          for (const achievement of achievements) {
            await supabase.from('user_achievements').upsert({
              user_id: userId,
              achievement_data: achievement
            }, { onConflict: 'user_id,achievement_data->>id' })
          }
          syncResults.achievements = achievements.length
        }
      } catch (error) {
        console.error('Achievements sync error:', error)
      }
    }

    // Sync monetary items (query 8)
    if (typesToSync.includes('monetaryItems')) {
      try {
        const items = await apiClient.makeRequest(8)
        if (Array.isArray(items)) {
          for (const item of items) {
            await supabase.from('user_monetary_items').upsert({
              user_id: userId,
              item_data: item
            })
          }
          syncResults.monetaryItems = items.length
        }
      } catch (error) {
        console.error('Monetary items sync error:', error)
      }
    }

    // Update last sync timestamp
    await supabase
      .from('profiles')
      .update({ last_sync: new Date().toISOString() })
      .eq('id', userId)

    return new Response(JSON.stringify({
      success: true,
      sync_results: syncResults,
      message: `Successfully synced user data for ${Object.values(syncResults).reduce((a: number, b: number) => a + b, 0)} records`
    }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('User data sync error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      details: 'Check user authentication and API key configuration'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})