import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Listing from './models/listing.model.js';

dotenv.config();

const listings = [
  {
    name: 'Modern Luxury Villa in Beverly Hills',
    description: 'Experience unparalleled luxury in this architecturally stunning villa. Located in the heart of Beverly Hills, this home boasts floor-to-ceiling glass windows, a private pool, smart home automation, and panoramic views of the Los Angeles skyline. Perfect for entertaining or enjoying quiet luxury.',
    address: '90210 Sunset Blvd, Beverly Hills, CA',
    regularPrice: 12500000,
    discountPrice: 11000000,
    bathrooms: 5,
    bedrooms: 5,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Cozy Downtown Loft Apartment',
    description: 'Charming and fully furnished studio loft in the vibrant downtown core. Features exposed brick walls, high timber ceilings, industrial-style piping, and large windows. Steps away from the finest dining, cafés, and transit systems.',
    address: '102 Market St Apt 4B, San Francisco, CA',
    regularPrice: 2800,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: true,
    parking: false,
    type: 'rent',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Spacious Suburban Family House',
    description: 'Beautiful 4-bedroom family home in a quiet, tree-lined neighborhood. Includes a spacious fenced backyard, modern kitchen with stainless steel appliances, a cozy fireplace, and an attached two-car garage. Excellent school district.',
    address: '405 Oakwood Lane, Austin, TX',
    regularPrice: 580000,
    discountPrice: 540000,
    bathrooms: 3,
    bedrooms: 4,
    furnished: false,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Chic Waterfront Beachfront Condo',
    description: 'Stunning beachfront apartment with direct access to the sand. Enjoy morning coffee on your private balcony overlooking the ocean. Modern amenities, marble countertops, 24/7 building security, and secure covered parking space.',
    address: '120 Ocean Drive, Miami Beach, FL',
    regularPrice: 1200000,
    discountPrice: 0,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Minimalist Urban Studio Flat',
    description: 'A micro-apartment maximizing storage and style. Minimal design with built-in bed modules, smart lighting, high-speed Wi-Fi capability, and a private balcony. Rent includes all utility rates.',
    address: '78 Queens Road, Seattle, WA',
    regularPrice: 1650,
    discountPrice: 1500,
    bathrooms: 1,
    bedrooms: 1,
    furnished: true,
    parking: false,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Elegant Countryside Stone Cottage',
    description: 'Escape the city rush to this charming, historic stone cottage nestled in lush green fields. Fully renovated with contemporary kitchen appliances, original wood beams, private garden, and outdoor dining patio.',
    address: '88 Meadow Lane, Woodstock, NY',
    regularPrice: 385000,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 2,
    furnished: false,
    parking: true,
    type: 'sale',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Premium Penthouse with City Views',
    description: 'Splendid luxury penthouse showcasing 360-degree city views. High ceilings, top-of-the-line appliances, master suite with steam shower, private wrap-around terrace, and keyless private elevator entry.',
    address: '55 Fifth Avenue Floor 45, New York, NY',
    regularPrice: 9500,
    discountPrice: 8800,
    bathrooms: 3,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Real-Estate-Marketplace';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to database.');

    // Clear existing data (optional, but good for a fresh start)
    console.log('Clearing old listings and mock seed users...');
    await Listing.deleteMany({ userRef: 'seed_landlord_id_123' });
    await User.deleteMany({ email: 'landlord@example.com' });

    // Create a seed user
    console.log('Creating a mock landlord user...');
    const hashedPassword = bcryptjs.hashSync('password123', 10);
    const seedUser = new User({
      _id: new mongoose.Types.ObjectId('65d0f1b212f38c3568c09a82'), // fixed ObjectId to keep refs consistent
      username: 'Seed Landlord',
      email: 'landlord@example.com',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    });
    await seedUser.save();
    console.log('Landlord user created successfully.');

    // Add userRef to mock listings
    const mockListings = listings.map(listing => ({
      ...listing,
      userRef: seedUser._id.toString()
    }));

    // Seed Listings
    console.log(`Inserting ${mockListings.length} mock listings...`);
    await Listing.insertMany(mockListings);
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedDB();
