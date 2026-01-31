import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const DATABASE_URL = 'postgresql://postgres:PtVmhzSsxvYNRMmfqiWjnyYIqTDldmFv@ballast.proxy.rlwy.net:59751/railway';
const DATA_DIR = path.join(__dirname, '..', 'server', 'data');
const CITY_DIR = path.join(DATA_DIR, 'attractions_by_city');

function writeJSON(filePath: string, data: any) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  const size = (fs.statSync(filePath).size / 1024).toFixed(1);
  console.log(`  ✓ ${path.relative(DATA_DIR, filePath)} — ${Array.isArray(data) ? data.length + ' rows' : 'object'} (${size} KB)`);
}

async function main() {
  const client = new Client(DATABASE_URL);
  await client.connect();
  console.log('Connected to Railway PostgreSQL\n');

  // 1. Destinations
  console.log('Exporting destinations...');
  const destinations = await client.query('SELECT * FROM destinations ORDER BY name');
  writeJSON(path.join(DATA_DIR, 'destinations.json'), destinations.rows);

  // 2. Tiqets Cities
  console.log('Exporting tiqets_cities...');
  const cities = await client.query('SELECT * FROM tiqets_cities ORDER BY name');
  writeJSON(path.join(DATA_DIR, 'tiqets_cities.json'), cities.rows);

  // 3. Attractions Summary (lightweight)
  console.log('Exporting attractions summary...');
  const summaryRows = await client.query(`
    SELECT id, title, slug, city_name,
      CASE 
        WHEN ai_content IS NOT NULL THEN jsonb_build_object(
          'keys', (SELECT jsonb_agg(k) FROM jsonb_object_keys(ai_content) AS k),
          'preview', left(ai_content::text, 200)
        )
        ELSE NULL
      END as ai_content_preview
    FROM tiqets_attractions
    ORDER BY city_name, title
  `);
  writeJSON(path.join(DATA_DIR, 'tiqets_attractions_summary.json'), summaryRows.rows);

  // 4. Full attractions by city
  console.log('Exporting attractions by city...');
  const cityNames = await client.query('SELECT DISTINCT city_name FROM tiqets_attractions ORDER BY city_name');
  for (const row of cityNames.rows) {
    const cityName: string = row.city_name;
    const slug = cityName.toLowerCase().replace(/\s+/g, '-');
    const attractions = await client.query(
      'SELECT * FROM tiqets_attractions WHERE city_name = $1 ORDER BY title',
      [cityName]
    );
    writeJSON(path.join(CITY_DIR, `${slug}.json`), attractions.rows);
  }

  // 5. Site settings
  console.log('Exporting site_settings...');
  const settings = await client.query('SELECT * FROM site_settings');
  writeJSON(path.join(DATA_DIR, 'site_settings.json'), settings.rows);

  // 6. Navigation
  console.log('Exporting navigation...');
  const menus = await client.query('SELECT * FROM navigation_menus ORDER BY id');
  const menuItems = await client.query('SELECT * FROM navigation_menu_items ORDER BY menu_id, sort_order');
  writeJSON(path.join(DATA_DIR, 'navigation_menus.json'), {
    menus: menus.rows,
    items: menuItems.rows
  });

  // 7. Hero slides
  console.log('Exporting hero_slides...');
  const heroSlides = await client.query('SELECT * FROM hero_slides ORDER BY id');
  writeJSON(path.join(DATA_DIR, 'hero_slides.json'), heroSlides.rows);

  // 8. Footer
  console.log('Exporting footer...');
  const footerSections = await client.query('SELECT * FROM footer_sections ORDER BY id');
  const footerLinks = await client.query('SELECT * FROM footer_links ORDER BY section_id, sort_order');
  writeJSON(path.join(DATA_DIR, 'footer_data.json'), {
    sections: footerSections.rows,
    links: footerLinks.rows
  });

  // 9. Translations (sample)
  console.log('Exporting translations (sample)...');
  const translations = await client.query('SELECT * FROM translations LIMIT 100');
  writeJSON(path.join(DATA_DIR, 'translations_sample.json'), translations.rows);

  await client.end();
  console.log('\n✅ Export complete!');
}

main().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
