export interface BillingProduct {
  name:     string
  price:    number
  unit:     string
  stock:    number
  category: string
  lowStock?: boolean
}

export interface BillingBill {
  no:       string
  customer: string
  amount:   string
  items:    number
  time:     string
  status:   'Paid' | 'Pending' | 'Credit'
}

export interface BillingData {
  slug:         string
  name:         string   // "Grocery Store Billing"
  emoji:        string
  shopName:     string   // demo shop name
  shopSub:      string   // city / tagline
  tagline:      string   // card tagline
  description:  string
  gradient:     string
  lightBg:      string
  accentBg:     string
  accentText:   string
  accentHover:  string
  price:        string
  badge:        string | null
  stats: { label: string; value: string; sub: string; up: boolean }[]
  products:     BillingProduct[]
  recentBills:  BillingBill[]
  features:     { icon: string; title: string; desc: string }[]
  modalFeatures: { icon: string; text: string }[]
}

export const billingData: BillingData[] = [
  // ── GROCERY / KIRANA ──────────────────────────────────────
  {
    slug:        'grocery',
    name:        'Grocery Store',
    emoji:       '🛒',
    shopName:    'Sharma Kirana Store',
    shopSub:     'Sector 14, Gurugram',
    tagline:     'Billing, inventory & GST for kirana shops',
    description: 'Complete billing software for grocery and kirana stores — fast POS billing, barcode support, stock management, credit tracking, and auto GST returns.',
    gradient:    'from-green-500 to-emerald-600',
    lightBg:     'bg-green-50',
    accentBg:    'bg-green-600',
    accentText:  'text-green-700',
    accentHover: 'hover:bg-green-700',
    price:       '₹4,999/yr',
    badge:       '🔥 Most Popular',
    stats: [
      { label: "Today's Sales",   value: '₹18,420', sub: '+12% vs yesterday', up: true  },
      { label: 'Bills Today',     value: '84',       sub: 'Avg ₹219/bill',     up: true  },
      { label: 'Low Stock Items', value: '6',        sub: 'Needs reorder',     up: false },
      { label: 'Credit Balance',  value: '₹4,200',   sub: '3 customers',       up: false },
    ],
    products: [
      { name: 'Basmati Rice (5kg)',     price: 380,  unit: 'bag',    stock: 42,  category: 'Grains'    },
      { name: 'Toor Dal (1kg)',         price: 145,  unit: 'kg',     stock: 28,  category: 'Pulses'    },
      { name: 'Sunflower Oil (1L)',      price: 140,  unit: 'bottle', stock: 35,  category: 'Oils'      },
      { name: 'Aashirvaad Atta (5kg)',  price: 290,  unit: 'bag',    stock: 18,  category: 'Grains'    },
      { name: 'Amul Butter (100g)',     price: 56,   unit: 'pack',   stock: 4,   category: 'Dairy',    lowStock: true },
      { name: 'Maggi Noodles (70g)',    price: 14,   unit: 'pack',   stock: 120, category: 'Packaged'  },
      { name: 'Surf Excel (1kg)',       price: 195,  unit: 'pack',   stock: 22,  category: 'Household' },
      { name: 'Colgate Toothpaste',     price: 99,   unit: 'piece',  stock: 3,   category: 'Personal', lowStock: true },
    ],
    recentBills: [
      { no: 'INV-0841', customer: 'Ramesh Kumar',  amount: '₹1,240', items: 8,  time: '10:24 AM', status: 'Paid'    },
      { no: 'INV-0840', customer: 'Sunita Devi',   amount: '₹380',  items: 3,  time: '10:11 AM', status: 'Paid'    },
      { no: 'INV-0839', customer: 'Ajay Sharma',   amount: '₹760',  items: 6,  time: '9:58 AM',  status: 'Credit'  },
      { no: 'INV-0838', customer: 'Walk-in',        amount: '₹195',  items: 2,  time: '9:45 AM',  status: 'Paid'    },
      { no: 'INV-0837', customer: 'Priya Mehta',   amount: '₹2,100',items: 14, time: '9:30 AM',  status: 'Paid'    },
    ],
    features: [
      { icon: '⚡', title: 'Fast POS Billing',    desc: 'Barcode scan or product search. Bill generated in seconds.' },
      { icon: '📦', title: 'Stock Management',    desc: 'Auto stock deduction on every sale. Low stock alerts on WhatsApp.' },
      { icon: '🧾', title: 'GST Auto-calculate',  desc: 'CGST/SGST applied automatically. GSTR-1 export ready.' },
      { icon: '💰', title: 'Credit / Udhaar',     desc: 'Track credit customers, send WhatsApp payment reminders.' },
    ],
    modalFeatures: [
      { icon: '⚡', text: 'Fast POS — barcode or search, bill in 10 seconds' },
      { icon: '📦', text: 'Inventory — auto deduct on sale, low stock alert' },
      { icon: '🧾', text: 'GST billing — CGST/SGST auto-applied, GSTR-1 export' },
      { icon: '💰', text: 'Udhaar/Credit tracker with WhatsApp reminder' },
      { icon: '📊', text: 'Daily/monthly sales reports with profit analysis' },
      { icon: '🖨️', text: 'Thermal & A4 bill printing, WhatsApp bill sharing' },
    ],
  },

  // ── PAINT SHOP ────────────────────────────────────────────
  {
    slug:        'paint-shop',
    name:        'Paint Shop',
    emoji:       '🎨',
    shopName:    'Ranjit Paint Centre',
    shopSub:     'MG Road, Bengaluru',
    tagline:     'Paint shop billing with shade-code & batch tracking',
    description: 'Billing software built for paint shops — track shade codes, batch numbers, mixing ratios, return stock, and GST invoicing for retail and contractor sales.',
    gradient:    'from-orange-500 to-red-500',
    lightBg:     'bg-orange-50',
    accentBg:    'bg-orange-500',
    accentText:  'text-orange-600',
    accentHover: 'hover:bg-orange-600',
    price:       '₹4,999/yr',
    badge:       null,
    stats: [
      { label: "Today's Sales",  value: '₹32,800', sub: '+8% vs yesterday',  up: true  },
      { label: 'Bills Today',    value: '22',       sub: 'Avg ₹1,490/bill',   up: true  },
      { label: 'Brands Tracked', value: '6',        sub: 'Asian · Berger · Nerolac', up: true },
      { label: 'Return Stock',   value: '₹1,200',   sub: '2 items pending',   up: false },
    ],
    products: [
      { name: 'Asian Paints Apex (20L)',     price: 3800, unit: 'tin',    stock: 12, category: 'Exterior' },
      { name: 'Berger WeatherCoat (10L)',    price: 2100, unit: 'tin',    stock: 8,  category: 'Exterior' },
      { name: 'Asian Paints Royale (4L)',    price: 1650, unit: 'tin',    stock: 15, category: 'Interior' },
      { name: 'Nerolac Impressions (1L)',    price: 540,  unit: 'tin',    stock: 22, category: 'Interior' },
      { name: 'Primer (20L)',               price: 1200, unit: 'tin',    stock: 9,  category: 'Primer'   },
      { name: 'Wall Putty (20kg)',           price: 680,  unit: 'bag',    stock: 3,  category: 'Putty',   lowStock: true },
      { name: 'Paint Brush Set',            price: 180,  unit: 'set',    stock: 30, category: 'Tools'    },
      { name: 'Paint Roller (9")',           price: 220,  unit: 'piece',  stock: 2,  category: 'Tools',   lowStock: true },
    ],
    recentBills: [
      { no: 'INV-0312', customer: 'Mohan Contractors',  amount: '₹18,400', items: 6,  time: '11:15 AM', status: 'Credit'  },
      { no: 'INV-0311', customer: 'Vikram Singh',       amount: '₹4,200',  items: 3,  time: '10:40 AM', status: 'Paid'    },
      { no: 'INV-0310', customer: 'Walk-in',            amount: '₹2,100',  items: 2,  time: '10:10 AM', status: 'Paid'    },
      { no: 'INV-0309', customer: 'Suresh Paints',      amount: '₹6,800',  items: 4,  time: '9:30 AM',  status: 'Paid'    },
      { no: 'INV-0308', customer: 'Rajiv Kumar',        amount: '₹1,200',  items: 1,  time: '9:00 AM',  status: 'Pending' },
    ],
    features: [
      { icon: '🎨', title: 'Shade Code Billing',  desc: 'Bill by shade code and batch number. Mixing ratios stored per shade.' },
      { icon: '📦', title: 'Brand-wise Stock',    desc: 'Track stock separately by brand, category, and tin size.' },
      { icon: '💳', title: 'Contractor Credit',   desc: 'Contractor accounts with credit limits and ledger history.' },
      { icon: '🧾', title: 'GST Invoicing',       desc: 'GST invoice with HSN codes. GSTR-1 and GSTR-3B reports.' },
    ],
    modalFeatures: [
      { icon: '🎨', text: 'Shade code billing — bill by shade, batch, and brand' },
      { icon: '📦', text: 'Brand-wise inventory — Asian, Berger, Nerolac tracked separately' },
      { icon: '💳', text: 'Contractor accounts with credit limit and ledger' },
      { icon: '🧾', text: 'GST invoicing with HSN codes — GSTR-1 export' },
      { icon: '🔄', text: 'Return stock management with credit notes' },
      { icon: '📊', text: 'Brand-wise sales report and profit margin analysis' },
    ],
  },

  // ── ICE CREAM / SWEETS ────────────────────────────────────
  {
    slug:        'sweets',
    name:        'Sweets & Ice Cream Shop',
    emoji:       '🍦',
    shopName:    'Mithas Sweet House',
    shopSub:     'Laxmi Nagar, Delhi',
    tagline:     'Sweets & ice cream billing with weight & flavour tracking',
    description: 'Billing software for sweet shops and ice cream parlours — per-gram and per-piece billing, flavour inventory, seasonal offers, and daily closing reports.',
    gradient:    'from-pink-500 to-rose-500',
    lightBg:     'bg-pink-50',
    accentBg:    'bg-pink-500',
    accentText:  'text-pink-600',
    accentHover: 'hover:bg-pink-600',
    price:       '₹3,999/yr',
    badge:       null,
    stats: [
      { label: "Today's Sales",  value: '₹12,640', sub: 'Festival boost +35%',  up: true  },
      { label: 'Bills Today',    value: '138',      sub: 'Avg ₹91/bill',         up: true  },
      { label: 'Flavours Active', value: '24',      sub: '4 sold out today',     up: false },
      { label: 'Box Orders',     value: '12',       sub: 'Pre-ordered for today', up: true  },
    ],
    products: [
      { name: 'Gulab Jamun (1kg)',      price: 360,  unit: 'kg',    stock: 8,  category: 'Sweets'     },
      { name: 'Kaju Katli (500g)',      price: 450,  unit: '500g',  stock: 5,  category: 'Dry Sweets' },
      { name: 'Rasgulla (1kg)',         price: 280,  unit: 'kg',    stock: 12, category: 'Sweets'     },
      { name: 'Vanilla Ice Cream Cup',  price: 40,   unit: 'cup',   stock: 80, category: 'Ice Cream'  },
      { name: 'Chocolate Bar (90ml)',   price: 30,   unit: 'piece', stock: 3,  category: 'Ice Cream', lowStock: true },
      { name: 'Mango Kulfi',            price: 25,   unit: 'piece', stock: 40, category: 'Kulfi'      },
      { name: 'Gift Box (500g assorted)',price: 600, unit: 'box',   stock: 20, category: 'Gift Box'   },
      { name: 'Barfi (1kg)',            price: 500,  unit: 'kg',    stock: 2,  category: 'Dry Sweets', lowStock: true },
    ],
    recentBills: [
      { no: 'INV-1042', customer: 'Walk-in',       amount: '₹360',  items: 2,  time: '11:30 AM', status: 'Paid'    },
      { no: 'INV-1041', customer: 'Priya Sharma',  amount: '₹1,200',items: 3,  time: '11:15 AM', status: 'Paid'    },
      { no: 'INV-1040', customer: 'Wedding Order', amount: '₹8,400',items: 12, time: '11:00 AM', status: 'Paid'    },
      { no: 'INV-1039', customer: 'Walk-in',       amount: '₹120',  items: 4,  time: '10:45 AM', status: 'Paid'    },
      { no: 'INV-1038', customer: 'Rahul Gupta',   amount: '₹600',  items: 1,  time: '10:30 AM', status: 'Pending' },
    ],
    features: [
      { icon: '⚖️', title: 'Weight Billing',     desc: 'Per-gram billing for loose sweets. Auto-calculate from weighing scale.' },
      { icon: '🍦', title: 'Flavour Inventory',  desc: 'Track each flavour separately. Mark sold out in one click.' },
      { icon: '🎁', title: 'Box / Gift Orders',  desc: 'Pre-orders for Diwali, weddings, and events with advance payment.' },
      { icon: '📊', title: 'Daily Closing',      desc: 'End-of-day cash count, drawer balance, and sales summary.' },
    ],
    modalFeatures: [
      { icon: '⚖️', text: 'Weight billing — per gram for loose sweets, auto from scale' },
      { icon: '🍦', text: 'Flavour-wise inventory — mark sold out in 1 click' },
      { icon: '🎁', text: 'Gift box & bulk orders with advance payment tracking' },
      { icon: '📊', text: 'Daily closing report with cash drawer balance' },
      { icon: '🧾', text: 'GST billing — 5% on sweets, 12% on packaged items auto-applied' },
      { icon: '📱', text: 'Digital bill on WhatsApp — reduce paper waste' },
    ],
  },

  // ── HARDWARE / BUILDING MATERIAL ─────────────────────────
  {
    slug:        'hardware',
    name:        'Hardware & Building Material',
    emoji:       '🔩',
    shopName:    'Balaji Hardware Store',
    shopSub:     'Industrial Area, Surat',
    tagline:     'Hardware & construction material billing & stock',
    description: 'Billing software for hardware and building material shops — manage hundreds of SKUs, contractor credit accounts, project-wise billing, and GST compliance.',
    gradient:    'from-gray-600 to-slate-700',
    lightBg:     'bg-gray-50',
    accentBg:    'bg-gray-700',
    accentText:  'text-gray-700',
    accentHover: 'hover:bg-gray-800',
    price:       '₹4,999/yr',
    badge:       null,
    stats: [
      { label: "Today's Sales",  value: '₹48,200', sub: '+5% vs yesterday',   up: true  },
      { label: 'Bills Today',    value: '31',       sub: 'Avg ₹1,555/bill',    up: true  },
      { label: 'Total SKUs',     value: '1,240',    sub: '18 low stock',       up: false },
      { label: 'Contractor Due', value: '₹82,000',  sub: '7 accounts',         up: false },
    ],
    products: [
      { name: 'ACC Cement (50kg)',          price: 380,  unit: 'bag',    stock: 200, category: 'Cement'   },
      { name: 'Steel Rod 10mm (per kg)',    price: 72,   unit: 'kg',     stock: 500, category: 'Steel'    },
      { name: 'Ceramic Floor Tile (sq ft)', price: 45,   unit: 'sq ft',  stock: 800, category: 'Tiles'    },
      { name: 'CPVC Pipe 0.5" (3m)',       price: 185,  unit: 'piece',  stock: 40,  category: 'Plumbing' },
      { name: 'Electrical Wire 1.5mm (m)', price: 28,   unit: 'meter',  stock: 3,   category: 'Electrical', lowStock: true },
      { name: 'River Sand (per cft)',       price: 38,   unit: 'cft',    stock: 500, category: 'Aggregate'},
      { name: 'Waterproof Paint (20L)',     price: 2800, unit: 'tin',    stock: 8,   category: 'Paint'    },
      { name: 'GI Nails (1kg)',             price: 90,   unit: 'kg',     stock: 2,   category: 'Fasteners', lowStock: true },
    ],
    recentBills: [
      { no: 'INV-0621', customer: 'Krishna Builders',  amount: '₹22,400', items: 8,  time: '11:00 AM', status: 'Credit'  },
      { no: 'INV-0620', customer: 'Sunil Contractors', amount: '₹8,700',  items: 4,  time: '10:30 AM', status: 'Paid'    },
      { no: 'INV-0619', customer: 'Walk-in',           amount: '₹1,900',  items: 3,  time: '10:00 AM', status: 'Paid'    },
      { no: 'INV-0618', customer: 'Mehta Constructions',amount:'₹14,200', items: 6,  time: '9:30 AM',  status: 'Credit'  },
      { no: 'INV-0617', customer: 'Ravi Electricals',  amount: '₹2,800',  items: 2,  time: '9:00 AM',  status: 'Paid'    },
    ],
    features: [
      { icon: '🔩', title: '1000+ SKU Management', desc: 'Handle thousands of items. Search by name, code, or barcode instantly.' },
      { icon: '🏗️', title: 'Project-wise Billing', desc: 'Track all purchases for a single construction project under one account.' },
      { icon: '💳', title: 'Contractor Ledger',    desc: 'Full account ledger for each contractor with credit limit control.' },
      { icon: '🧾', title: 'GST Compliance',       desc: 'HSN code-wise invoicing. GSTR-1, GSTR-3B export in one click.' },
    ],
    modalFeatures: [
      { icon: '🔩', text: '1000+ SKU management with barcode search' },
      { icon: '🏗️', text: 'Project-wise billing — all materials for one project tracked together' },
      { icon: '💳', text: 'Contractor ledger with credit limit and outstanding alerts' },
      { icon: '🧾', text: 'HSN code-wise GST — GSTR-1 / 3B export' },
      { icon: '📦', text: 'Multi-unit stock — bags, kg, sq ft, running meter' },
      { icon: '📊', text: 'Category-wise profit margin reports' },
    ],
  },

  // ── CLOTH / TEXTILE ───────────────────────────────────────
  {
    slug:        'cloth-shop',
    name:        'Cloth & Textile Shop',
    emoji:       '🧵',
    shopName:    'Laxmi Cloth House',
    shopSub:     'Textile Market, Surat',
    tagline:     'Meter-wise billing, design tracking & wholesale accounts',
    description: 'Billing software for cloth and textile shops — per-meter billing, design and colour inventory, wholesale account management, and GST invoicing.',
    gradient:    'from-purple-500 to-violet-600',
    lightBg:     'bg-purple-50',
    accentBg:    'bg-purple-600',
    accentText:  'text-purple-700',
    accentHover: 'hover:bg-purple-700',
    price:       '₹4,999/yr',
    badge:       null,
    stats: [
      { label: "Today's Sales",  value: '₹24,600', sub: '+15% vs yesterday', up: true  },
      { label: 'Bills Today',    value: '18',       sub: 'Avg ₹1,366/bill',  up: true  },
      { label: 'Designs in Stock', value: '340',   sub: '12 designs low',   up: false },
      { label: 'Wholesale Due',  value: '₹1.2L',   sub: '4 accounts',       up: false },
    ],
    products: [
      { name: 'Cotton Poplin (per meter)',  price: 85,   unit: 'meter', stock: 200, category: 'Cotton'  },
      { name: 'Pure Silk (per meter)',      price: 850,  unit: 'meter', stock: 40,  category: 'Silk'    },
      { name: 'Georgette (per meter)',      price: 180,  unit: 'meter', stock: 150, category: 'Synthetic'},
      { name: 'Linen (per meter)',          price: 260,  unit: 'meter', stock: 80,  category: 'Linen'   },
      { name: 'Bridal Net (per meter)',     price: 420,  unit: 'meter', stock: 4,   category: 'Bridal', lowStock: true },
      { name: 'Cotton Blend (per meter)',   price: 120,  unit: 'meter', stock: 300, category: 'Blend'   },
      { name: 'Velvet (per meter)',         price: 320,  unit: 'meter', stock: 3,   category: 'Special', lowStock: true },
      { name: 'Thread (per spool)',         price: 45,   unit: 'spool', stock: 60,  category: 'Accessories'},
    ],
    recentBills: [
      { no: 'INV-0512', customer: 'Fashion Point',    amount: '₹8,400',  items: 5,  time: '11:20 AM', status: 'Paid'   },
      { no: 'INV-0511', customer: 'Walk-in',          amount: '₹1,700',  items: 2,  time: '11:00 AM', status: 'Paid'   },
      { no: 'INV-0510', customer: 'Priya Boutique',   amount: '₹4,200',  items: 4,  time: '10:30 AM', status: 'Credit' },
      { no: 'INV-0509', customer: 'Walk-in',          amount: '₹850',    items: 1,  time: '10:00 AM', status: 'Paid'   },
      { no: 'INV-0508', customer: 'Meera Garments',   amount: '₹9,600',  items: 6,  time: '9:30 AM',  status: 'Paid'   },
    ],
    features: [
      { icon: '📏', title: 'Meter Billing',       desc: 'Bill in meters or yards with decimal precision. Cut fabric from roll.' },
      { icon: '🎨', title: 'Design & Colour Stock', desc: 'Track each design-colour combination separately. Know exactly what\'s left.' },
      { icon: '🏭', title: 'Wholesale Accounts',  desc: 'Wholesale customer pricing, credit limits, and order history.' },
      { icon: '🧾', title: 'GST on Textiles',     desc: '5% / 12% GST applied by fabric type automatically.' },
    ],
    modalFeatures: [
      { icon: '📏', text: 'Meter/yard billing with decimal — cut from roll tracking' },
      { icon: '🎨', text: 'Design & colour-wise inventory — 340+ designs tracked' },
      { icon: '🏭', text: 'Wholesale accounts with slab pricing and credit ledger' },
      { icon: '🧾', text: 'Textile GST — 5% / 12% auto-applied by fabric type' },
      { icon: '📦', text: 'Roll/bundle stock management with remaining meter alert' },
      { icon: '📊', text: 'Design-wise bestseller report for buying decisions' },
    ],
  },

  // ── MEDICAL / PHARMACY ────────────────────────────────────
  {
    slug:        'medical',
    name:        'Medical / Pharmacy',
    emoji:       '💊',
    shopName:    'City Medical Store',
    shopSub:     'Main Market, Indore',
    tagline:     'Pharmacy billing with expiry tracking & schedules',
    description: 'Billing software designed for pharmacies and medical stores — batch/expiry tracking, Schedule H/X medicines, doctor prescription management, and drug licensing compliance.',
    gradient:    'from-teal-500 to-cyan-600',
    lightBg:     'bg-teal-50',
    accentBg:    'bg-teal-600',
    accentText:  'text-teal-700',
    accentHover: 'hover:bg-teal-700',
    price:       '₹5,999/yr',
    badge:       '⚕️ Compliance Ready',
    stats: [
      { label: "Today's Sales",  value: '₹22,800', sub: '+6% vs yesterday',   up: true  },
      { label: 'Bills Today',    value: '112',      sub: 'Avg ₹203/bill',      up: true  },
      { label: 'Expiring Soon',  value: '8',        sub: 'Next 30 days',       up: false },
      { label: 'Pending Returns', value: '₹1,800',  sub: '3 items',            up: false },
    ],
    products: [
      { name: 'Dolo 650 (strip of 15)',     price: 30,   unit: 'strip',  stock: 80,  category: 'Tablet'    },
      { name: 'Crocin 500mg (strip)',       price: 22,   unit: 'strip',  stock: 50,  category: 'Tablet'    },
      { name: 'Betadine 100ml',             price: 85,   unit: 'bottle', stock: 12,  category: 'Antiseptic'},
      { name: 'Azithromycin 500mg (3)',     price: 95,   unit: 'strip',  stock: 4,   category: 'Schedule H', lowStock: true },
      { name: 'Insulin 100IU/mL (10mL)',    price: 280,  unit: 'vial',   stock: 8,   category: 'Injection' },
      { name: 'ORS Sachet (x10)',           price: 45,   unit: 'pack',   stock: 35,  category: 'OTC'       },
      { name: 'Vitamin D3 (60 caps)',       price: 180,  unit: 'bottle', stock: 20,  category: 'Supplement'},
      { name: 'BP Monitor (Omron)',         price: 1800, unit: 'piece',  stock: 2,   category: 'Device',   lowStock: true },
    ],
    recentBills: [
      { no: 'RX-1421', customer: 'Rajesh Gupta',   amount: '₹480',  items: 4,  time: '11:25 AM', status: 'Paid'    },
      { no: 'RX-1420', customer: 'Geeta Devi',     amount: '₹1,250',items: 7,  time: '11:10 AM', status: 'Paid'    },
      { no: 'RX-1419', customer: 'Walk-in',         amount: '₹180',  items: 2,  time: '10:55 AM', status: 'Paid'    },
      { no: 'RX-1418', customer: 'Suresh Patil',   amount: '₹320',  items: 3,  time: '10:40 AM', status: 'Pending' },
      { no: 'RX-1417', customer: 'Anita Sharma',   amount: '₹2,100',items: 9,  time: '10:20 AM', status: 'Paid'    },
    ],
    features: [
      { icon: '⏰', title: 'Expiry Tracking',      desc: 'Auto-alert 30/60/90 days before expiry. Batch-wise stock management.' },
      { icon: '📋', title: 'Prescription Records', desc: 'Attach doctor name and Rx number to each Schedule H/X medicine.' },
      { icon: '🔄', title: 'Return / Replacement', desc: 'Manage medicine returns from customers with credit note.' },
      { icon: '🧾', title: 'Drug License Billing', desc: 'DL number on every invoice. GST as per medicine category.' },
    ],
    modalFeatures: [
      { icon: '⏰', text: 'Expiry date tracking — batch-wise, alert 30-90 days ahead' },
      { icon: '📋', text: 'Schedule H/X prescription management — doctor + Rx number recorded' },
      { icon: '🔄', text: 'Return / replacement with credit note and batch tracking' },
      { icon: '🧾', text: 'Drug license number on invoice — GST by medicine category' },
      { icon: '📦', text: 'FIFO stock dispatch — oldest batch goes out first' },
      { icon: '📊', text: 'Expiry loss report, return analysis, supplier-wise purchase' },
    ],
  },
]
