import { AttractionType } from '../types';

// Mock data for attractions
export const getAttractions = (): AttractionType[] => {
  return [
    {
      id: 'attraction-1',
      name: 'Eiffel Tower',
      description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889 as the entrance to the 1889 World\'s Fair.',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
      hours: '9:30 AM - 11:45 PM (Last elevator ride at 11:00 PM)',
      price: '€17.10 - €26.80, depending on floor access',
      website: 'https://www.toureiffel.paris/en',
      rating: 4.7,
    },
    {
      id: 'attraction-2',
      name: 'Louvre Museum',
      description: 'The Louvre, or the Louvre Museum, is the world\'s largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city\'s 1st arrondissement.',
      image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Rue de Rivoli, 75001 Paris',
      hours: '9:00 AM - 6:00 PM (Closed on Tuesdays)',
      price: '€15 - €17',
      website: 'https://www.louvre.fr/en',
      rating: 4.8,
    },
    {
      id: 'attraction-3',
      name: 'Notre-Dame Cathedral',
      description: 'Notre-Dame de Paris, referred to simply as Notre-Dame, is a medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. The cathedral is currently closed for reconstruction after the devastating fire in April 2019.',
      image: 'https://images.pexels.com/photos/1850021/pexels-photo-1850021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
      hours: 'Exterior viewing only during reconstruction',
      price: 'Free (exterior viewing)',
      website: 'https://www.notredamedeparis.fr/',
      rating: 4.6,
    },
    {
      id: 'attraction-4',
      name: 'Arc de Triomphe',
      description: 'The Arc de Triomphe de l\'Étoile is one of the most famous monuments in Paris, France, standing at the western end of the Champs-Élysées at the center of Place Charles de Gaulle.',
      image: 'https://images.pexels.com/photos/2421/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Place Charles de Gaulle, 75008 Paris',
      hours: '10:00 AM - 10:30 PM (April to September), 10:00 AM - 9:30 PM (October to March)',
      price: '€13',
      website: 'http://www.paris-arc-de-triomphe.fr/en/',
      rating: 4.7,
    },
    {
      id: 'attraction-5',
      name: 'Sacré-Cœur Basilica',
      description: 'The Basilica of the Sacred Heart of Paris, commonly known as Sacré-Cœur Basilica, is a Roman Catholic church and minor basilica in Paris, France, dedicated to the Sacred Heart of Jesus.',
      image: 'https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: '35 Rue du Chevalier de la Barre, 75018 Paris',
      hours: '6:00 AM - 10:30 PM',
      price: 'Free entry (dome and crypt: €8)',
      website: 'http://www.sacre-coeur-montmartre.com/english/',
      rating: 4.8,
    },
    {
      id: 'attraction-6',
      name: 'Palace of Versailles',
      description: 'The Palace of Versailles was the principal royal residence of France from 1682, under Louis XIV, until the start of the French Revolution in 1789, under Louis XVI.',
      image: 'https://images.pexels.com/photos/1125212/pexels-photo-1125212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Place d\'Armes, 78000 Versailles',
      hours: '9:00 AM - 6:30 PM (Closed on Mondays)',
      price: '€18 - €27 (depends on included areas)',
      website: 'https://en.chateauversailles.fr/',
      rating: 4.8,
    }
  ];
};

// Function to get a specific attraction by ID
export const getAttractionById = (id: string): AttractionType | undefined => {
  const attractions = getAttractions();
  return attractions.find(attraction => attraction.id === id);
};