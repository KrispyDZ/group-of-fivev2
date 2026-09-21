import { FoodItem, LoggedMeal, DayStreak } from '../types';

export const NOURISH_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBt8QDr2PEss4yl7u6NT4A4GjJhEYPk6BclmRHmEWz5INPIj9cuMWyZ5w5sQaoMUsKGoa4wgFXZrkI7VktmN0hC89SiG0X9ECDKjVDL-3Uyy5r3UFhsvlv5lCNjObrGxqQtgCY6yM8gKeIn__TQf-svgyevxeOSL31-umfR6DHVqyJS74_tXWkbbFHpfmxmcSFnLI3giiAAUyrQ44qcEph6I9Eu_MmfI1dJWufhxs_aRqqoEAGmlgkF';

export const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDCZpF8RoauNs7O2t3Sj_dj5lHdUZaAIiA6eCc_gaoSHxBrH8gqIfyHKl_3X0Nfw-08qgAOQQh-a_iJ_XRl6NwDtodKEV-9qshJ4XQ6qPXggJ0OKTg2nbetA1iWHGo2uyBUfS7qRep2jxc_dYC5KV7xvX1KjZlVMzbOLWqye-FsKc5hpeAddgURjOfeWVkvldou6r1ttk-hdNSK9oT5X1lj90RQMMNWbmCm5sDKuwfl7W3gG8PRXDHN';

export const INITIAL_STREAK: DayStreak[] = [
  { dayName: 'M', dateNum: 20, isCompleted: true, dateKey: '2026-10-20' },
  { dayName: 'T', dateNum: 21, isCompleted: true, dateKey: '2026-10-21' },
  { dayName: 'W', dateNum: 22, isCompleted: true, dateKey: '2026-10-22' },
  { dayName: 'T', dateNum: 23, isCompleted: true, dateKey: '2026-10-23' },
  { dayName: 'F', dateNum: 24, isCompleted: false, isActiveToday: true, dateKey: '2026-10-24' },
  { dayName: 'S', dateNum: 25, isCompleted: false, dateKey: '2026-10-25' },
  { dayName: 'S', dateNum: 26, isCompleted: false, dateKey: '2026-10-26' },
];

export const INITIAL_MEALS: LoggedMeal[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    description: 'Greek Yogurt bowl, berries & almonds',
    calories: 480,
    isLogged: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVqUkOP9Ys5Her5BaNWNp6ZanWUrTu6sopq92kpw3JbNsgfF4v9R1ueaeR88kYkF6_CK5wgseuZfPyN7_d9LXuBUtbevQMArup9zt2qSH9JHElyl5GcZDV4h4Wp2hseTAvLtLD-vG6rGb-ul_deKVfxLzKW8omr7umcqZFbCjOBZKF_aIILHrhcQjJMfEmBByYUBnh8_OMDUlt1oerR8hUdlR9pxHYn7Qof057H1SYu88P-BA8ZKAr',
    imageAlt: 'Greek yogurt bowl with blueberries and raspberries',
    items: [
      { name: 'Organic Greek Yogurt', calories: 220, portion: '200g' },
      { name: 'Fresh Wild Blueberries', calories: 60, portion: '80g' },
      { name: 'Raw Crushed Almonds', calories: 150, portion: '25g' },
      { name: 'Pure Acacia Honey', calories: 50, portion: '1 tbsp' },
    ],
  },
  {
    id: 'lunch',
    title: 'Lunch',
    description: 'Grilled chicken quinoa & avocado salad',
    calories: 620,
    isLogged: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZizpwE7a3qbMWeGtQfONmPdpX7k9P57xKaa1RMx7rbWxTnKz0BTincHLN3gOCRsIJRM8gjWSxYHjPmzG6CGLpAfqBNRIn1q3UXu-MDvV-2Vvzcj-6eZwqTbAjkV9WCffyxtALdJ7FzNJRcJIz5AgarpUdcokUJObOXiHf_qz1ciq7jzgkc2XQKCdzkgE6fSSlfiTUwUccUhKAdVx0Ty2TMVAfGbgJA7pX1yXFnnPc1JspVgMHq7v5',
    imageAlt: 'Nutritious grilled chicken salad with quinoa and avocado',
    items: [
      { name: 'Herb Marinated Chicken Breast', calories: 280, portion: '180g' },
      { name: 'Fluffy Steamed Quinoa', calories: 160, portion: '120g' },
      { name: 'Hass Avocado Slices', calories: 110, portion: '60g' },
      { name: 'Extra Virgin Lemon Dressing', calories: 70, portion: '1.5 tbsp' },
    ],
  },
  {
    id: 'dinner',
    title: 'Dinner',
    description: 'Not logged yet • 700 kcal budget',
    calories: 0,
    budgetKcal: 700,
    isLogged: false,
  },
  {
    id: 'snacks',
    title: 'Snacks',
    description: 'Green apple & natural peanut butter',
    calories: 320,
    isLogged: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcQnmUZQ9kZAkiD8jAjqY687ee6L9GjaiWuF1VKIZ0_dFbnv39kNb1weSnYw4gzOaF9Rq8nVIDGuC_ZZZrhA9cXuZDnz0m-s1JX8F0_g0ALouSDrKdL673IUg04lQF24kUd6htT7MaECXLmQp_4qB2AJU7mQd4qUGgW_RxzcYoNELtb-Eud0YXMgEDDbD1lFGPmOuigSD_1MVFFVz_6fbIEDUDATqwXFyUVEF5nvFqPQvjplONZX1x',
    imageAlt: 'Sliced crisp green apple paired with natural peanut butter',
    items: [
      { name: 'Crisp Granny Smith Apple', calories: 130, portion: '1 large' },
      { name: 'Organic Creamy Peanut Butter', calories: 190, portion: '2 tbsp' },
    ],
  },
];

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'salmon',
    name: 'Atlantic Salmon Fillet',
    subtitle: 'Pan-seared',
    portion: '200g',
    portionGrams: 200,
    calories: 412,
    protein: 40,
    carbs: 0,
    fat: 26,
    isStaged: true,
    category: 'Recent',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGUC-5ExuJM3rMb6UUbOFIhoXrAyU3GYJml80BBr8sapwchdL8B9orO4d4FgcoTYSnGp5ne5HOFhyGRISfK5QjoNbw-sMwJk4qg3HSy-BuSuu0tBAoiicDx6O6spjpq8QfjGDgDXcptYYs9LN-ghfSiYstoKSp35-BJe12C1akzkLaQ30E9mTUGdw9OFAfgi7yGLgWsseMrMlRAt23fy5_gys-sCyedhuCIBQLBM-8g862ud83Y6-i',
    imageAlt: 'Pan-seared Atlantic salmon fillet with golden herb crust',
  },
  {
    id: 'rice',
    name: 'Steamed Jasmine Rice',
    subtitle: '1 cup (158g) standard',
    portion: '158g',
    portionGrams: 158,
    calories: 205,
    protein: 4,
    carbs: 45,
    fat: 0.5,
    isStaged: true,
    category: 'Recent',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD27s5IXfV0iIis9XR08MXRMjOq46gILRePewomQ3drjaviVmit4-7LVA2jcTMLVtUZC-EENCHuyWPolTOAmFhMOVvkhwPpLBcOF9SU3HiA0sv50ThNFr2CHlHQOJdnWNOYBhasQIZsPoDyXN6cI6rQq4YjFN5vdAhyYoQutCLAkoFSCX7mGDYV_QMtmpnZqVV8qQeYPywXRaEH-tKIbjWqEhR97WICmExbBlQfeOTs0jXYJir5L2SM',
    imageAlt: 'Fluffy warm steamed jasmine rice in ceramic bowl',
  },
  {
    id: 'asparagus',
    name: 'Roasted Asparagus',
    subtitle: 'With Olive Oil · 100g',
    portion: '100g',
    portionGrams: 100,
    calories: 65,
    protein: 3,
    carbs: 5,
    fat: 4,
    isStaged: false,
    category: 'Frequent',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtxtQncov6upDABtVPaaGsrR6BulfaOAYOwzGhzx4x35X4QARpFQV29OoQn9feGBOiWtMIDwES3jzrXjZb2_IDIfurxQke5wmDIP5ut0VRR5DgfwqJg3Zt8fbTC0GlMYfK29WUQkiXYf6r6Bd3Sk0F8y831GoYVZcRmbvnF87f0PaseW_ri9TNsZgcGXN_DFRnhNX5mgGFuxPLngU-gS_xG02oOZFPQwf7NdB8OkcdKOoGa6MSmsqc',
    imageAlt: 'Tender roasted green asparagus spears drizzled with olive oil',
  },
  {
    id: 'avocado',
    name: 'Avocado Slice',
    subtitle: 'Fresh Hass · 50g',
    portion: '50g',
    portionGrams: 50,
    calories: 80,
    protein: 1,
    carbs: 4,
    fat: 7,
    isStaged: false,
    category: 'Favorites',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-vBY5TS71tszDK-lKDCJLH4p3EkfYAZAK1V2OkzYfKP926PfBtU-gChN6ifTEzG-NwIr7QNPqGVDrvWmY_y1bLeyepyteiek-8Pv9Zn_vGSIPZUu2NitS8g05GGRhOv0vChfAIS2sC0AxQnQdv7FUaAdhOZv2k7vzZgLn-F_r13JA4-krCBfTB6Ss_6pqyO_YnjTG-pNOr18wUNEar6_pKTbBTZ9WClpwpeEABPU2nP9G24TH_pBB',
    imageAlt: 'Fresh sliced ripe avocado on off-white ceramic dish',
  },
  {
    id: 'chicken-breast',
    name: 'Poached Free-Range Chicken',
    subtitle: 'Lean breast cut · 150g',
    portion: '150g',
    portionGrams: 150,
    calories: 248,
    protein: 46,
    carbs: 0,
    fat: 5.2,
    isStaged: false,
    category: 'Recent',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Uzexmv3fo6dt8I3vKu_Q7MhspWi3p3f5V0aR0nJSVqw-ZeYwIbLSq1y6R2TEWZrEpmSidl_TYSDds6tj3bQVLoKDYgMOYTlACQ5CzsS4BTmtlhTaEdJqp6yTHau6qxDbC19dbsgb3hZ74hLBqqNd-SDY-darSn_MRZWGA_lBAt5EqKaSHB5r6KoGvDYTmsz6ejXpTM_EvKS-EHWIewPYF5fywku0FawPDrVPMHMK7CdDFUSvxhTX',
    imageAlt: 'Poached free-range lean chicken breast',
  },
  {
    id: 'chia-bowl',
    name: 'Berries & Overnight Chia',
    subtitle: 'Almond milk base · 180g',
    portion: '180g',
    portionGrams: 180,
    calories: 310,
    protein: 11,
    carbs: 38,
    fat: 14,
    isStaged: false,
    category: 'Favorites',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjYnDyRJWWP3V-uIeSeN0YDlc9FxyFUGy7DQtte1iDyj28oX49QWvdXXc5GW3NyF-DSEoMTbNdgBzjwzq5QrTQlT4qUEYbiWuI3DMQhMTEnjcAM8nOd-ne5DWsOI7--BvqMd15l9tnVU-LoJpJH32LBHZK7JyKPbFpUQYGe5UKJXPm9jgqnEoIBUu8M0pf_DR7B9SFaC2sx2pKJYpHVMWos4LxBz6oL-ua2JhldiqZFM0BWvWzcW1P',
    imageAlt: 'Tranquil morning chia pudding bowl with berries',
  },
];
