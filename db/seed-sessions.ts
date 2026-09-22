import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seedSessionsAndWorkshops() {
  const { db } = await import('./index');
  const {
    sessionEvents,
    sessionRegistrations,
    workshops,
    globalPaymentMethods,
    workshopRegistrations,
    branches,
  } = await import('./schema');

  console.log('🌱 Seeding Free Sessions & Workshops...\n');

  // ─── Fetch a branch name to use as default ────────────────────────────────
  const allBranches = await db.select({ name: branches.name }).from(branches).limit(2);
  const branch1 = allBranches[0]?.name ?? 'Main Branch';
  const branch2 = allBranches[1]?.name ?? 'Main Branch';

  // ─── 1. Session Events ────────────────────────────────────────────────────
  console.log('📅 Seeding session event...');

  const sessionDate = new Date();
  sessionDate.setDate(sessionDate.getDate() + 14);
  sessionDate.setHours(10, 0, 0, 0);

  const [sessionEvent] = await db
    .insert(sessionEvents)
    .values({
      title: 'Free Health & Fitness Orientation Session',
      description:
        'Join Astaj and our expert coaches for a one-on-one free orientation session. We will assess your current health condition, discuss your fitness goals, and guide you towards the right programme. This session is open to everyone — especially those managing weight loss, diabetes, heart conditions, or recovering from injury.',
      sessionDate,
      targetCategory: 'General Fitness',
      inviteLink: 'https://wa.me/8801632442096',
      isActive: true,
    })
    .returning();

  console.log(`   ✅ Session: "${sessionEvent.title}"`);

  // ─── 2. Sample Session Registrations ─────────────────────────────────────
  console.log('\n👤 Seeding sample session registrations...');

  const sampleSessionRegs = [
    {
      sessionEventId: sessionEvent.id,
      name: 'Rahim Uddin',
      whatsappNumber: '+8801711223344',
      email: 'rahim.uddin@example.com',
      age: 38,
      gender: 'Male' as const,
      healthCategory: 'Weight Loss',
      fitnessGoal: 'I want to lose 15 kg in 6 months. I have a desk job and barely move around.',
      preferredBranch: branch1,
      isInvited: false,
    },
    {
      sessionEventId: sessionEvent.id,
      name: 'Fatema Khanam',
      whatsappNumber: '+8801855667788',
      email: 'fatema.khanam@example.com',
      age: 52,
      gender: 'Female' as const,
      healthCategory: 'Heart Patient',
      fitnessGoal: 'My doctor recommended light exercise. I want to improve my heart health safely.',
      preferredBranch: branch2,
      isInvited: true,
    },
    {
      sessionEventId: sessionEvent.id,
      name: 'Tariq Hasan',
      whatsappNumber: '+8801999001122',
      email: 'tariq.hasan@example.com',
      age: 25,
      gender: 'Male' as const,
      healthCategory: 'General Fitness',
      fitnessGoal: 'Build muscle and improve overall fitness. I am a complete beginner.',
      preferredBranch: branch1,
      isInvited: false,
    },
  ];

  for (const reg of sampleSessionRegs) {
    await db.insert(sessionRegistrations).values(reg);
    console.log(`   ✅ ${reg.name} — ${reg.healthCategory} (invited: ${reg.isInvited})`);
  }

  // ─── 3. Workshops ─────────────────────────────────────────────────────────
  console.log('\n🎓 Seeding workshops...');

  const workshop1Date = new Date();
  workshop1Date.setDate(workshop1Date.getDate() + 21);
  workshop1Date.setHours(10, 0, 0, 0);

  const workshop2Date = new Date();
  workshop2Date.setDate(workshop2Date.getDate() + 28);
  workshop2Date.setHours(9, 0, 0, 0);

  const [workshop1] = await db
    .insert(workshops)
    .values({
      title: 'Nutrition & Meal Planning for Bangladeshi Lifestyles',
      description:
        'A 3-hour deep-dive into building healthy eating habits without giving up your favourite deshi foods. We cover macronutrients, practical meal prep, blood sugar management, and debunk common nutritional myths — all tailored for the Bangladeshi diet. You will leave with a custom 7-day meal plan.',
      instructor: 'Md. Astaj Mia (Head Coach, Fitlife BD)',
      workshopDate: workshop1Date,
      duration: '3 hours',
      price: '৳1,500',
      totalSeats: 20,
      isActive: true,
    })
    .returning();

  console.log(`   ✅ Workshop 1: "${workshop1.title}"`);

  const [workshop2] = await db
    .insert(workshops)
    .values({
      title: 'Beginner Strength Training — Safe & Effective',
      description:
        'A hands-on practical workshop covering correct lifting form, injury prevention, and how to build your first 8-week strength programme from scratch. Ideal for anyone who has never lifted weights before, or is returning after a long break. Equipment provided on the day.',
      instructor: 'Fitlife BD Coaching Team',
      workshopDate: workshop2Date,
      duration: '4 hours',
      price: '৳2,000',
      totalSeats: 15,
      isActive: true,
    })
    .returning();

  console.log(`   ✅ Workshop 2: "${workshop2.title}"`);

  // ─── 4. Global Payment Methods ──────────────────────────────────────────
  console.log('\n💳 Seeding global payment methods...');

  const paymentMethods = [
    { operator: 'bKash',  accountNumber: '01632442096', accountType: 'Personal' },
    { operator: 'Nagad',  accountNumber: '01632442096', accountType: 'Personal' },
  ];

  for (const m of paymentMethods) {
    await db.insert(globalPaymentMethods).values(m);
    console.log(`   ✅ ${m.operator} ${m.accountNumber}`);
  }

  // ─── 5. Sample Workshop Registrations ────────────────────────────────────
  console.log('\n📝 Seeding sample workshop registrations...');

  const sampleWorkshopRegs = [
    {
      workshopId: workshop1.id,
      name: 'Sumaiya Akter',
      whatsappNumber: '+8801600334455',
      email: 'sumaiya.akter@example.com',
      senderPhoneNumber: '01711223344',
      paymentOperator: 'bKash',
      paymentToNumber: '01632442096',
      transactionId: 'BK7A3F2C',
      paymentStatus: 'pending',
    },
    {
      workshopId: workshop2.id,
      name: 'Arif Billah',
      whatsappNumber: '+8801766889900',
      email: 'arif.billah@example.com',
      senderPhoneNumber: '01999001122',
      paymentOperator: 'Nagad',
      paymentToNumber: '01632442096',
      transactionId: 'NG5C8D1E',
      paymentStatus: 'confirmed',
    },
  ];

  for (const reg of sampleWorkshopRegs) {
    await db.insert(workshopRegistrations).values(reg);
    const label = reg.workshopId === workshop1.id ? 'Nutrition' : 'Strength';
    console.log(`   ✅ ${reg.name} → Workshop [${label}] — ${reg.paymentStatus}`);
  }

  // ─── Done ─────────────────────────────────────────────────────────────────
  console.log('\n🎉 Seed complete! Summary:');
  console.log('   • 1 active session event with 3 sample registrations');
  console.log('   • 2 active workshops with 4 payment methods and 2 registrations');
  console.log('\n✅ Visit /free-session and /workshops to see the live pages.');

  process.exit(0);
}

seedSessionsAndWorkshops().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
