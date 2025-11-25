const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateGameData() {
  console.log('🚀 Starting game data migration...')

  try {
    // Load JSON files
    const dataFiles = {
      items: loadJsonFile('1001.json'),
      production: loadJsonFile('1002.json'),
      factoryUpgrades: loadJsonFile('1004.json'),
      buildingUpgrades: loadJsonFile('1005.json'),
      marketPrices: loadJsonFile('1006.json'),
      units: loadJsonFile('1007.json')
    }

    console.log('📁 Loaded data files')

    // Migrate game items
    await migrateGameItems(dataFiles)

    // Migrate market prices
    await migrateMarketPrices(dataFiles.marketPrices)

    console.log('✅ Migration completed successfully!')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

function loadJsonFile(filename) {
  const filePath = path.join(__dirname, '..', filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filename}`)
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

async function migrateGameItems(dataFiles) {
  const items = []

  // Process items from 1001.json
  if (Array.isArray(dataFiles.items)) {
    dataFiles.items.forEach(item => {
      items.push({
        item_id: item.id || item.itemID,
        name: item.name || item.itemName,
        category: determineCategory(item),
        data: item
      })
    })
  }

  // Process production data from 1002.json
  if (Array.isArray(dataFiles.production)) {
    dataFiles.production.forEach(item => {
      items.push({
        item_id: item.factoryID || item.id,
        name: item.name,
        category: 'production',
        data: item
      })
    })
  }

  // Process factory upgrades from 1004.json
  if (Array.isArray(dataFiles.factoryUpgrades)) {
    dataFiles.factoryUpgrades.forEach(item => {
      items.push({
        item_id: item.factoryID,
        name: `${item.name} Upgrade`,
        category: 'factory_upgrade',
        data: item
      })
    })
  }

  // Process building upgrades from 1005.json
  if (Array.isArray(dataFiles.buildingUpgrades)) {
    dataFiles.buildingUpgrades.forEach(item => {
      items.push({
        item_id: item.buildingID,
        name: `${item.name} Upgrade`,
        category: 'building_upgrade',
        data: item
      })
    })
  }

  // Process units from 1007.json
  if (Array.isArray(dataFiles.units)) {
    dataFiles.units.forEach(item => {
      items.push({
        item_id: item.unitID,
        name: item.name,
        category: 'unit',
        data: item
      })
    })
  }

  // Insert in batches to avoid timeout
  const batchSize = 50
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const { error } = await supabase
      .from('game_items')
      .upsert(batch, { onConflict: 'item_id' })

    if (error) {
      console.error(`Batch ${i / batchSize + 1} failed:`, error)
      throw error
    }
  }

  console.log(`✅ Migrated ${items.length} game items`)
}

async function migrateMarketPrices(prices) {
  if (!Array.isArray(prices)) {
    console.warn('No market prices data found')
    return
  }

  const formattedPrices = prices.map(item => ({
    item_id: item.itemID,
    item_name: item.itemName,
    ki_price: item.KIprice || 0,
    price: item.price || 0,
    unix_timestamp: item.unixts || Math.floor(Date.now() / 1000)
  }))

  // Insert in batches
  const batchSize = 100
  for (let i = 0; i < formattedPrices.length; i += batchSize) {
    const batch = formattedPrices.slice(i, i + batchSize)
    const { error } = await supabase
      .from('market_prices')
      .upsert(batch, { onConflict: 'item_id,unix_timestamp' })

    if (error) {
      console.error(`Price batch ${i / batchSize + 1} failed:`, error)
      throw error
    }
  }

  console.log(`✅ Migrated ${formattedPrices.length} market price records`)
}

function determineCategory(item) {
  // Determine category based on item properties
  if (item.factoryID) return 'factory'
  if (item.buildingID) return 'building'
  if (item.unitID) return 'unit'
  if (item.KIprice !== undefined) return 'market_item'
  if (item.production) return 'production'
  return 'misc'
}

// Run migration if called directly
if (require.main === module) {
  migrateGameData()
}

module.exports = { migrateGameData }