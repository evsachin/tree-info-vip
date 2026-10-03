/**
 * Organization / Project Configuration
 *
 * Change these values when using the application
 * for a different organization or project.
 */
export const organization = {
  name: "Karve Institute",
  headName: "Nisha Sachin Manvatkar",
  initiativeName: "CSR INITIATIVE",
  projectName: "OXYGEN PARK PROJECT",
  totalTrees: 800,
};

/**
 * Tree Data
 *
 * Add new trees by copying an existing object.
 *
 * slug becomes:
 * /tree/<slug>
 */

export const trees = [
  {
    id: "TREE-001",
    treeNumber: "125",

    slug: "banyan-tree",

    commonName: "Banyan Tree",
    localName: "Vad",
    scientificName: "Ficus benghalensis",

    family: "Moraceae",

    location: "Pune, Maharashtra, India",

    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
    },

    age: "80 years",
    height: "18 meters",

    description:
      "The Banyan is a large evergreen tree known for its aerial roots that grow down from the branches and become new trunks. Over time a single tree can spread into a wide, shady grove. It is the national tree of India.",

    importance: {
      environmental:
        "Its dense canopy cools the surroundings and its leaves help capture dust and airborne particles.",

      ecological:
        "Small figs feed birds, bats and squirrels through much of the year.",

      medicinal:
        "Bark, leaves and latex are used in traditional Ayurvedic remedies.",

      cultural:
        "Regarded as sacred and often planted near village meeting places and temples.",

      wildlife:
        "Branches and aerial roots give shelter and nesting sites to many birds and insects.",
    },

    images: [
      "/images/trees/banyan.jpg",
      "/images/trees/banyan.jpg",
    ],
  },

  {
    id: "TREE-002",
    treeNumber: "126",

    slug: "peepal-tree",

    commonName: "Peepal Tree",
    localName: "Pimpal",
    scientificName: "Ficus religiosa",

    family: "Moraceae",

    location: "Pune, Maharashtra, India",

    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
    },

    age: "60 years",
    height: "20 meters",

    description:
      "The Peepal, also called the sacred fig, is easy to recognise by its heart-shaped leaves with long, tapering tips. The leaves flutter in even a light breeze. It is a large, long-lived tree that often grows beside temples and old wells.",

    importance: {
      environmental:
        "A large canopy gives dependable shade and helps keep streets and courtyards cooler.",

      ecological:
        "Its figs are eaten by birds, bats and other small animals.",

      medicinal:
        "Parts of the tree feature in traditional Ayurvedic practice.",

      cultural:
        "Sacred in Hinduism and Buddhism. The Bodhi Tree, under which the Buddha attained enlightenment, was a Peepal.",

      wildlife:
        "Fruit-eating birds help spread its seeds across the neighbourhood.",
    },

    images: [
      "/images/trees/peepal.jpg",
      "/images/trees/peepal.jpg",
    ],
  },

  {
    id: "TREE-003",
    treeNumber: "127",

    slug: "neem-tree",

    commonName: "Neem Tree",
    localName: "Neem",
    scientificName: "Azadirachta indica",

    family: "Meliaceae",

    location: "Pune, Maharashtra, India",

    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
    },

    age: "35 years",
    height: "14 meters",

    description:
      "Neem is a fast-growing evergreen tree with feathery compound leaves and small white, honey-scented flowers. It tolerates heat and dry conditions, which makes it a common roadside and courtyard tree across India.",

    importance: {
      environmental:
        "Provides deep shade and stays green through hot, dry months.",

      ecological:
        "Flowers attract bees, and the fruit is eaten by birds.",

      medicinal:
        "Leaves, bark and oil have a long history of use in traditional medicine.",

      cultural:
        "Neem has strong cultural importance in many parts of India.",

      wildlife:
        "Fruits are a food source for birds such as parakeets and mynas.",
    },

    images: [
      "/images/trees/neem.jpg",
      "/images/trees/neem.jpg",
    ],
  },

  {
    id: "TREE-004",
    treeNumber: "128",

    slug: "mango-tree",

    commonName: "Mango Tree",
    localName: "Amba",
    scientificName: "Mangifera indica",

    family: "Anacardiaceae",

    location: "Pune, Maharashtra, India",

    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
    },

    age: "40 years",
    height: "15 meters",

    description:
      "The Mango is a dense, evergreen tree with a rounded crown and glossy, dark green leaves. It flowers in the cooler months and bears fruit in summer. India is one of the world's largest growers of mangoes.",

    importance: {
      environmental:
        "Its thick canopy provides heavy shade, especially valuable in summer.",

      ecological:
        "Flowers are visited by bees and other pollinating insects.",

      medicinal:
        "Leaves and bark have traditional uses in home remedies.",

      cultural:
        "Mango leaves are used in traditional decorations during festivals and weddings.",

      wildlife:
        "Ripe fruit is eaten by birds, bats and squirrels.",
    },

    images: [
      "/images/trees/mango.jpg",
      "/images/trees/mango.jpg",
    ],
  },

  {
    id: "TREE-005",
    treeNumber: "129",

    slug: "ashoka-tree",

    commonName: "Ashoka Tree",
    localName: "Ashoka",
    scientificName: "Saraca asoca",

    family: "Fabaceae",

    location: "Pune, Maharashtra, India",

    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
    },

    age: "25 years",
    height: "9 meters",

    description:
      'The Ashoka is a small evergreen tree with bunches of orange-red flowers that bloom on the trunk and branches in spring. The name means "without sorrow".',

    importance: {
      environmental:
        "A compact tree that suits gardens and shady spots, adding colour and cover.",

      ecological:
        "Its nectar-rich flowers attract butterflies and other pollinators.",

      medicinal:
        "The bark is used in Ayurveda.",

      cultural:
        "Sacred in Hindu and Buddhist traditions and linked with many temple gardens.",

      wildlife:
        "Provides shelter and flowers for insects and small birds.",
    },

    images: [
      "/images/trees/ashoka.jpg",
      "/images/trees/ashoka.jpg",
    ],
  },
];

/**
 * Find tree using URL slug.
 */
export const getTreeBySlug = (slug) =>
  trees.find((tree) => tree.slug === slug);