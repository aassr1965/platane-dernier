import { getPayload } from "payload";
import config from "@payload-config";

// --- Définition des types pour les catégories ---
interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  color?: string;
  subcategories?: Subcategory[];
}

// --- Constantes ---
const CATEGORIES_COLLECTION_SLUG = "categories";

// Structure de données étendue pour les catégories (2 niveaux max)
const categoriesData: Category[] = [
  { name: "All", slug: "all" },
  // --- Chauffage ---
  {
    name: "Chauffage",
    slug: "chauffage",
    color: "#FAD7A0", // Orange clair
    subcategories: [
      { name: "Accessoires Chauffage", slug: "accessoires-chauffage" }, // 10-100€
      { name: "Chauffage d'appoint", slug: "chauffage-appoint" }, // 30-200€
      { name: "Traitement des boues", slug: "traitement-boues" }, // 30-200€
      { name: "Combustibles & Stockage", slug: "combustibles-stockage" }, // 50-300€
      { name: "Fumisterie & Évacuation", slug: "fumisterie-evacuation" }, // 100-400€
      { name: "Régulation & Thermostats", slug: "regulation-thermostats" }, // 100-500€
      { name: "Radiateurs & Émetteurs", slug: "radiateurs-emetteurs" }, // 300-1000€
      { name: "Production Eau Chaude Sanitaire (ECS)", slug: "production-ecs" }, // 800-3000€
      { name: "Plancher chauffant", slug: "plancher-chauffant" }, // 1000-4000€
      { name: "Poêles & Inserts", slug: "poeles-inserts" }, // 1500-5000€
      { name: "Chaudières", slug: "chaudieres" }, // 2000-6000€
      { name: "Pompes à Chaleur (PAC)", slug: "pompes-a-chaleur" }, // 5000-15000€
    ],
  },
  // --- Plomberie ---
  {
    name: "Plomberie",
    slug: "plomberie",
    color: "#AED6F1", // Bleu pastel
    subcategories: [
      { name: "Accessoires Plomberie", slug: "accessoires-plomberie" }, // 5-50€
      { name: "Arrosage & Jardin", slug: "arrosage-jardin" }, // 10-100€
      { name: "Anti-bélier & Anti-vibration", slug: "anti-belier-vibration" }, // 20-80€
      {
        name: "Gaz (Raccords & Accessoires)",
        slug: "gaz-raccords-accessoires",
      }, // 20-100€
      { name: "Évacuation des eaux usées", slug: "evacuation-eaux-usees" }, // 30-150€
      {
        name: "Comptage & Réduction de pression",
        slug: "comptage-reduction-pression",
      }, // 50-200€
      { name: "Tuyauterie & Raccords", slug: "tuyauterie-raccords" }, // 50-300€
      { name: "Robinetterie", slug: "robinetterie" }, // 100-500€
      { name: "Traitement de l'eau", slug: "traitement-eau" }, // 200-800€
      { name: "Sanitaires", slug: "sanitaires" }, // 200-1000€
      { name: "Récupération eau de pluie", slug: "recuperation-eau-pluie" }, // 500-1500€
      { name: "Pompes & Surpresseurs", slug: "pompes-surpresseurs" }, // 500-2000€
    ],
  },
  // --- Outillage & Consommables ---
  {
    name: "Outillage", // Raccourci
    slug: "outillage-consommables",
    color: "#D5DBDB", // Gris très clair
    subcategories: [
      { name: "Consommables de chantier", slug: "consommables-chantier" }, // 5-50€
      { name: "Marquage & Traçage", slug: "marquage-tracage" }, // 5-50€
      { name: "Nettoyage & Entretien", slug: "nettoyage-entretien" }, // 10-80€
      { name: "Fixation & Supportage", slug: "fixation-supportage" }, // 10-100€
      { name: "Équipement de Protection Individuelle (EPI)", slug: "epi" }, // 20-150€
      { name: "Outillage à main", slug: "outillage-main" }, // 30-200€
      { name: "Mesure & Contrôle", slug: "mesure-controle" }, // 50-300€
      { name: "Soudure & Brasage", slug: "soudure-brasage" }, // 100-500€
      { name: "Manutention & Levage", slug: "manutention-levage" }, // 100-600€
      { name: "Échelles & Échafaudages", slug: "echelles-echafaudages" }, // 150-800€
      { name: "Outillage électroportatif", slug: "outillage-electroportatif" }, // 200-1000€
    ],
  },
  // --- Ventilation & Climatisation ---
  {
    name: "Climatisation", // Déjà raccourci
    slug: "ventilation-climatisation",
    color: "#A3E4D7", // Turquoise pastel
    subcategories: [
      { name: "Accessoires Climatisation", slug: "accessoires-climatisation" }, // 10-80€
      { name: "Grilles & Bouches", slug: "grilles-bouches" }, // 20-100€
      {
        name: "Gainage & Accessoires Ventilation",
        slug: "gainage-accessoires-ventilation",
      }, // 50-200€
      { name: "Aérateurs & Extracteurs", slug: "aerateurs-extracteurs" }, // 100-400€
      { name: "Traitement de l'air", slug: "traitement-air" }, // 200-600€
      { name: "Climatiseurs mobiles", slug: "climatiseurs-mobiles" }, // 300-800€
      { name: "VMC (Simple flux, Double flux)", slug: "vmc" }, // 300-2000€
      { name: "Climatiseurs fixes (Splits)", slug: "climatiseurs-fixes" }, // 1000-3000€
    ],
  },
  // --- Pièces Détachées ---
  {
    name: "Pièces Détachées", // Nom raisonnable
    slug: "pieces-detachees",
    color: "#EAECEE", // Gris extra clair
    subcategories: [
      {
        name: "Visserie & Boulonnerie Spécifique",
        slug: "visserie-boulonnerie-specifique",
      }, // 5-30€
      { name: "Joints & Étanchéité", slug: "joints-etancheite" }, // 5-50€
      { name: "Mécanismes WC", slug: "mecanismes-wc" }, // 15-80€
      { name: "Pièces Sanitaires", slug: "pieces-sanitaires" }, // 20-100€
      { name: "Pièces Robinetterie", slug: "pieces-robinetterie" }, // 20-100€
      { name: "Composants Électriques", slug: "composants-electriques" }, // 30-150€
      { name: "Pièces Radiateurs", slug: "pieces-radiateurs" }, // 50-200€
      { name: "Pièces Pompes", slug: "pieces-pompes" }, // 100-400€
      { name: "Pièces Chauffe-eau", slug: "pieces-chauffe-eau" }, // 100-500€
      { name: "Pièces Chaudières", slug: "pieces-chaudieres" }, // 200-1000€
      { name: "Pièces PAC & Climatisation", slug: "pieces-pac-climatisation" }, // 500-2000€
    ],
  },
  // --- Énergies Renouvelables ---
  {
    name: "Énergies Renouvelables", // Nom raisonnable
    slug: "energies-renouvelables",
    color: "#ABEBC6", // Vert pastel
    subcategories: [
      {
        name: "Accessoires Énergies Renouvelables",
        slug: "accessoires-energies-renouvelables",
      }, // 100-1000€
      {
        name: "Récupération Eau de Pluie (Systèmes)",
        slug: "recuperation-eau-pluie-systemes",
      }, // 1000-4000€
      {
        name: "Biomasse (Focus Renouvelable)",
        slug: "biomasse-focus-renouvelable",
      }, // 2000-6000€
      { name: "Solaire Thermique", slug: "solaire-thermique" }, // 2000-8000€
      {
        name: "Pompes à chaleur (Focus Renouvelable)",
        slug: "pac-focus-renouvelable",
      }, // 3000-12000€
      { name: "Solaire Photovoltaïque", slug: "solaire-photovoltaique" }, // 3000-15000€
    ],
  },
  // --- Quincaillerie Sanitaire & Chauffage ---
  {
    name: "Quincaillerie", // Raccourci
    slug: "quincaillerie-sanitaire-chauffage",
    color: "#F2F3F4", // Gris argent très clair
    subcategories: [
      { name: "Accessoires de finition", slug: "accessoires-finition" },
      {
        name: "Pattes à vis & Tiges filetées",
        slug: "pattes-vis-tiges-filetees",
      },
      { name: "Chevilles & Scellements", slug: "chevilles-scellements" },
      { name: "Produits d'Étanchéité", slug: "produits-etancheite" },
      {
        name: "Colliers & Supports Tuyauterie",
        slug: "colliers-supports-tuyauterie",
      },
      { name: "Isolation & Calorifugeage", slug: "isolation-calorifugeage" },
      { name: "Fixations Murales", slug: "fixations-murales" },
    ],
  },
  // --- Électricité (Liée Plomberie/Chauffage) ---
  {
    name: "Électricité", // Nom raisonnable
    slug: "electricite-connexe",
    color: "#F9E79F", // Jaune pastel
    subcategories: [
      { name: "Gaines & Conduits", slug: "gaines-conduits" },
      { name: "Raccordement & Connexion", slug: "raccordement-connexion" },
      { name: "Éclairage de chantier", slug: "eclairage-chantier" },
      { name: "Appareillage", slug: "appareillage" },
      { name: "Câbles & Fils", slug: "cables-fils" },
      { name: "Protection électrique", slug: "protection-electrique" },
    ],
  },
  // --- Salle de Bain & Cuisine (Équipement) ---
  {
    name: "SdB & Cuisine", // Raccourci
    slug: "equipement-salle-bain-cuisine",
    color: "#D7BDE2", // Lavande/Violet pastel
    subcategories: [
      { name: "Accessoires de Salle de Bain", slug: "accessoires-salle-bain" },
      { name: "Crédences & Plans de travail", slug: "credences-plans-travail" },
      { name: "Hottes de Cuisine", slug: "hottes-cuisine" },
      {
        name: "Miroirs & Armoires de toilette",
        slug: "miroirs-armoires-toilette",
      },
      {
        name: "Meubles sous-évier (Cuisine)",
        slug: "meubles-sous-evier-cuisine",
      },
      { name: "Parois & Portes de Douche", slug: "parois-portes-douche" },
      { name: "Meubles de Salle de Bain", slug: "meubles-salle-bain" },
    ],
  },
  // --- Traitement de l'Air & de l'Eau (Global) ---
  {
    name: "Traitement Air/Eau", // Raccourci
    slug: "traitement-air-eau-global",
    color: "#A9CCE3", // Bleu ciel/gris-bleu clair
    subcategories: [
      { name: "Humidificateurs", slug: "humidificateurs" },
      { name: "Stérilisateurs UV", slug: "sterilisateurs-uv" },
      { name: "Filtres à eau potable", slug: "filtres-eau-potable" },
      { name: "Déshumidificateurs", slug: "deshumidificateurs" },
      { name: "Purificateurs d'air", slug: "purificateurs-air" },
      { name: "Osmoseurs", slug: "osmoseurs" },
      { name: "Adoucisseurs d'eau", slug: "adoucisseurs-eau" },
    ],
  },
  // --- Piscine & Spa ---
  {
    name: "Piscine & Spa", // Nom raisonnable
    slug: "piscine-spa",
    color: "#A2D9CE", // Vert d'eau pastel
    subcategories: [
      { name: "Accessoires Piscine & Spa", slug: "accessoires-piscine-spa" },
      { name: "Pièces à sceller Piscine", slug: "pieces-sceller-piscine" },
      { name: "Traitement Eau Piscine", slug: "traitement-eau-piscine" },
      { name: "Robots & Nettoyage Piscine", slug: "robots-nettoyage-piscine" },
      { name: "Équipement Spa", slug: "equipement-spa" },
      { name: "Filtration Piscine", slug: "filtration-piscine" },
      { name: "Chauffage Piscine", slug: "chauffage-piscine" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  // --- Delete Existing Categories ---
  try {
    console.log("Deleting existing categories...");
    await payload.delete({
      collection: CATEGORIES_COLLECTION_SLUG,
      where: {}, // Une clause where vide cible tous les documents
    });
    console.log("Existing categories deleted.");
  } catch (error) {
    console.error("Error deleting existing categories:", error);
    console.warn(
      "Proceeding with seeding new categories despite deletion failure."
    );
    // Décidez si vous voulez arrêter le processus de seed si la suppression échoue
    // process.exit(1);
  }

  // --- Seed New Categories ---
  console.log("Seeding new categories...");
  for (const category of categoriesData) {
    try {
      // Création de la catégorie principale (Niveau 1)
      const parentCategoryDocument = await payload.create({
        collection: CATEGORIES_COLLECTION_SLUG,
        data: {
          name: category.name,
          slug: category.slug,
          ...(category.color && { color: category.color }),
          parent: null, // Explicitement null pour les catégories de premier niveau
        },
      });
      console.log(
        `Created category: ${parentCategoryDocument.name} (ID: ${parentCategoryDocument.id})`
      );

      // Boucle pour créer les sous-catégories directes (Niveau 2)
      if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategory of category.subcategories) {
          await payload.create({
            collection: CATEGORIES_COLLECTION_SLUG,
            data: {
              name: subcategory.name,
              slug: subcategory.slug,
              parent: parentCategoryDocument.id, // Liaison au parent (Niveau 1)
            },
          });
          // console.log(`  Created subcategory: ${subcategory.name} under ${parentCategoryDocument.name}`);
        }
      }
    } catch (error) {
      console.error(
        `Error seeding category ${category.name} or its subcategories:`,
        error
      );
    }
  }
  console.log("Category seeding finished.");
};

// Exécution du script de seed
(async () => {
  try {
    await seed();
    console.log("Seed script completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Critical error during seeding process:", err);
    process.exit(1);
  }
})();
