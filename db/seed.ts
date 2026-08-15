import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// We must use require here or dynamic import to ensure dotenv.config runs FIRST before db/index.ts is evaluated.
// However, tsx handles top-level await well.
async function main() {
  const { db } = await import('./index');
  const { gymStats, services, trainers, pricingPlans, transformations, branches, faqs } = await import('./schema');
  const { 
    gymStats: initialStats, servicesData, trainersData, 
    pricingPlans: initialPricing, transformationsData, 
    branchesData, faqData 
  } = await import('../lib/data');

  console.log('Seeding database...');

  try {
    // Seed Gym Stats
    console.log('Seeding Gym Stats...');
    await db.delete(gymStats);
    for (let i = 0; i < initialStats.length; i++) {
      await db.insert(gymStats).values({
        label: initialStats[i].label,
        number: initialStats[i].number,
        suffix: initialStats[i].suffix,
        sortOrder: i,
      });
    }

    // Seed Services
    console.log('Seeding Services...');
    await db.delete(services);
    for (let i = 0; i < servicesData.length; i++) {
      await db.insert(services).values({
        title: servicesData[i].title,
        description: servicesData[i].description,
        icon: servicesData[i].icon,
        sortOrder: i,
      });
    }

    // Seed Trainers
    console.log('Seeding Trainers...');
    await db.delete(trainers);
    for (let i = 0; i < trainersData.length; i++) {
      await db.insert(trainers).values({
        name: trainersData[i].name,
        specialization: trainersData[i].specialization,
        experience: trainersData[i].experience,
        imageUrl: trainersData[i].image,
        sortOrder: i,
      });
    }

    // Seed Pricing Plans
    console.log('Seeding Pricing Plans...');
    await db.delete(pricingPlans);
    for (let i = 0; i < initialPricing.length; i++) {
      await db.insert(pricingPlans).values({
        name: initialPricing[i].name,
        duration: initialPricing[i].duration,
        bestFor: initialPricing[i].bestFor,
        price: initialPricing[i].price,
        features: initialPricing[i].features,
        isHighlighted: initialPricing[i].highlighted,
        sortOrder: i,
      });
    }

    // Seed Transformations
    console.log('Seeding Transformations...');
    await db.delete(transformations);
    for (let i = 0; i < transformationsData.length; i++) {
      await db.insert(transformations).values({
        name: transformationsData[i].name,
        goal: transformationsData[i].goal,
        quote: transformationsData[i].quote,
        imageBefore: transformationsData[i].imageBefore,
        imageAfter: transformationsData[i].imageAfter,
        sortOrder: i,
      });
    }

    // Seed Branches
    console.log('Seeding Branches...');
    await db.delete(branches);
    for (let i = 0; i < branchesData.length; i++) {
      let city = 'Rajshahi';
      if (branchesData[i].name.includes('Dhaka')) city = 'Dhaka';
      if (branchesData[i].name.includes('Chapai')) city = 'Chapai Nawabganj';

      await db.insert(branches).values({
        city,
        name: branchesData[i].name,
        address: branchesData[i].address,
        mapEmbed: branchesData[i].mapUrl,
        sortOrder: i,
      });
    }

    // Seed FAQs
    console.log('Seeding FAQs...');
    await db.delete(faqs);
    for (let i = 0; i < faqData.length; i++) {
      await db.insert(faqs).values({
        question: faqData[i].question,
        answer: faqData[i].answer,
        sortOrder: i,
      });
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();
