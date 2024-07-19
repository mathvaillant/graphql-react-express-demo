const Project = require("./models/Project");
const Client = require("./models/Client");
const connectDB = require("./config/db");
const colors = require("colors");
require("dotenv").config();

connectDB();

const clients = [
  {
    name: 'Tony Stark',
    email: 'ironman@gmail.com',
    phone: '343-567-4333',
    projects: [
      {
        name: 'Iron Man Suit Upgrade',
        description: 'Enhancements to the Mark 50 suit for better performance in battle.',
        status: 'OPEN',
      },
      {
        name: 'Stark Industries Website',
        description: 'Revamping the Stark Industries corporate website for better UX.',
        status: 'COMPLETED',
      },
      {
        name: 'AI Assistant Development',
        description: 'Developing a new AI assistant for personal and corporate use.',
        status: 'IN_PROGRESS',
      },
    ],
  },
  {
    name: 'Natasha Romanova',
    email: 'blackwidow@gmail.com',
    phone: '223-567-3322',
    projects: [
      {
        name: 'Espionage Network',
        description: 'Building a secure network for espionage operations.',
        status: 'IN_PROGRESS',
      },
      {
        name: 'Martial Arts Training App',
        description: 'Creating an app for martial arts training and fitness.',
        status: 'OPEN',
      },
      {
        name: 'Covert Operations Planning',
        description: 'Planning and strategizing covert operations for intelligence gathering.',
        status: 'IN_PROGRESS',
      },
    ],
  },
  {
    name: 'Thor Odinson',
    email: 'thor@gmail.com',
    phone: '324-331-4333',
    projects: [
      {
        name: 'Asgard Restoration',
        description: 'Efforts to restore and rebuild the kingdom of Asgard.',
        status: 'IN_PROGRESS',
      },
      {
        name: 'Stormbreaker Enhancement',
        description: 'Enhancing the Stormbreaker weapon for greater power.',
        status: 'COMPLETED',
      },
      {
        name: 'Midgard Relations',
        description: 'Improving relations and diplomacy between Asgard and Midgard (Earth).',
        status: 'OPEN',
      },
    ],
  },
  {
    name: 'Steve Rogers',
    email: 'steve@gmail.com',
    phone: '344-562-6787',
    projects: [
      {
        name: 'Avengers Training Program',
        description: 'Developing a training program for new Avengers recruits.',
        status: 'IN_PROGRESS',
      },
      {
        name: 'Shield Technology Upgrade',
        description: 'Upgrading the technology and capabilities of Captain America’s shield.',
        status: 'COMPLETED',
      },
      {
        name: 'Time Travel Research',
        description: 'Researching the implications and methods of time travel.',
        status: 'OPEN',
      },
    ],
  },
  {
    name: 'Bruce Banner',
    email: 'bruce@gmail.com',
    phone: '321-468-8887',
    projects: [
      {
        name: 'Gamma Radiation Research',
        description: 'Researching the effects and applications of gamma radiation.',
        status: 'IN_PROGRESS',
      },
      {
        name: 'Hulkbuster Armor',
        description: 'Developing armor to control Hulk transformations.',
        status: 'OPEN',
      },
      {
        name: 'Therapeutic Treatments',
        description: 'Developing treatments to help manage anger and stress.',
        status: 'IN_PROGRESS',
      },
    ],
  },
];


// Seed Database
const seedDB = async () => {
  try {
    await Project.deleteMany();
    await Client.deleteMany();

    const createdClients = await Client.insertMany(clients.map(({ projects, ...client }) => client));
    const projects = clients.flatMap(({ projects }, index) => projects.map((project) => ({
      ...project,
      clientId: createdClients[index]._id,
    })));

    await Project.insertMany(projects);

    process.exit(0);
  } catch (error) {
    console.log(error.message.toString().red);
    process.exit(1);
  }
};

// Call Seed Database
seedDB();


