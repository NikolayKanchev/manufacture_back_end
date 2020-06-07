require('dotenv').config();
const Category = require('../models/Category');

const subCategories = {
    "Food and Baverage": [
        { title: 'Alcoholic Baverage'},
        { title: 'Non-Alcoholic Baverage'},
        { title: 'Baked Food'},
        { title: 'Canned Food'},
        { title: 'Confectionery'},
        { title: 'Ingredients'},
        { title: 'Instant Food'},
        { title: 'Baby Food'},
        { title: 'Been Products'},
        { title: 'Coffee'},
        { title: 'Egg & Egg Products'},
        { title: 'Fruit Products'},
        { title: 'Honey & Honey Products'},
        { title: 'Meat Products'},
        { title: 'Seafood'},
        { title: 'Snack Food'},
        { title: 'Other Food & Baverage'}
    ],
    "Agriculture": [
        { title: 'Beens'},
        { title: 'Coffee'},
        { title: 'Fruit'},
        { title: 'Cigars & Cigarettes'},
        { title: 'Animal Products'},
        { title: 'Cocoa Beens'},
        { title: 'Farm Machinery & Equipment'},
        { title: 'Ornamental Plants'},
        { title: 'Oil'},
        { title: 'Vegetables'}
    ],
    "Apparel": [
        { title: 'Apparel Stock'},
        { title: "Men's Clothing"},
        { title: "Women's Clothing"},
        { title: "Girl's Clothing"},
        { title: "Boy's Clothing"},
        { title: "Mannequins"},
        { title: "Sportswear"},
        { title: "Wedding Apparel"},
        { title: "Stage & Dance Wear"},
        { title: "Maternity Clothing"},
        { title: "Infant & Toddlers Clothing"},
        { title: "Other Apparel"},
    ],
    "Accessories": [
        { title: 'Belts'},
        { title: 'Belt Accessories'},
        { title: 'Gloves'},
        { title: 'Hats & Caps'},
        { title: 'Scarf, Hat & Glove Sets'},
        { title: "Wedding Accessories"},
        { title: "Leather Accessories"},
        { title: "Scarves & Shawls"},
    ],
    "Leather Product": [
        { title: 'Genuine Leather Products'},
        { title: 'Leather Accessories'},
        { title: 'Leather Jackets'},
        { title: 'Leather Gloves'},
        { title: 'Leather Bags'},
        { title: 'Leather Shoes'},
    ],
    "Jewelry, Eyewear, Wach": [
        { title: 'Jewelry'},
        { title: 'Glasses'},
        { title: 'Sunglases'},
        { title: 'Glasess Frames'},
        { title: 'Necklaces'},
        { title: 'Wathches'},
        { title: 'Bracelets & Bangles'},
        { title: 'Jewelry Boxes'},
        { title: 'Jewelry Tools & Equipment'},
        { title: 'Other'},
    ],
    "Auto, Transport, Accessories": [
        { title: 'Car Fabrics'},
        { title: 'Trailers'},
        { title: 'Truck Parts & Accessories'},
        { title: 'Motorcycles & Scooters'},
        { title: 'Emergency Vehicles'},
        { title: 'Trains'},
        { title: 'Marine Parts & Accessories'},
        { title: 'Bus'},
        { title: 'ATVs & UTVs'},
        { title: 'Containers'},
    ],
    "Shoes, Bags & Accessories": [
        { title: 'Bags'},
        { title: 'Bags, Parts, Materials'},
        { title: 'Luggage & Travel Bags'},
        { title: 'Camera Bags'},
        { title: 'Sport & Leisure Bags'},
        { title: 'Cosmetic Cases & Bags'},
        { title: 'Wallets'},
        { title: 'Business Cases & Bags'},
        { title: 'Baby Shoes'},
        { title: 'Dance Shoes'},
        { title: "Men's Shoes"},
        { title: "Women's Shoes"},
        { title: "Girl's Shoes"},
        { title: "Boy's Shoes"},
        { title: "Repering Equipment"},
        { title: "Shoe Parts & Accessories"},
        { title: "Shoe Materials"},

    ],
    "Electronics": [
        { title: 'Computer Hardware & Software'},
        { title: 'Parts & Accessories'},
        { title: 'Mobile Phones & Accessories'},
        { title: 'Portable Video, Audio & Accessories'},
        { title: 'Electronic Cigarettes'},
        { title: 'Camera, Photo & Accessories'},
        { title: 'Video Game & Accessories'},
        { title: 'TV & Radio Accessories'},
        { title: 'Cables'},
    ],
    "Home Appliance": [
        { title: 'Fans'},
        { title: 'Dryers'},
        { title: 'Coffee Makers'},
        { title: 'Home Appliance Parts'},
        { title: 'Citchen Appliances'},
        { title: 'Air Conditioners'},
        { title: 'Coocking Appliances'},
    ],
    "Protection & Security": [
        { title: 'Locks & Keys'},
        { title: 'Alarm'},
        { title: 'Firefighting Supplies'},
        { title: 'Roadway Safety'},
        { title: 'Water Safety Products'},
        { title: 'Police & Military Supplies'},
        { title: 'Bullet Proof Vest'},
        { title: 'Safes'},
        { title: 'Self Defense Supplies'},
        { title: 'Alcohol Tester'},
        { title: 'Fire Alarm'},
    ],
    "Electrical Components, Equipment & Telecoms": [
        { title: 'Batteries'},
        { title: 'Transformers'},
        { title: 'Solar Energy Products'},
        { title: 'Circuit Breakers'},
        { title: 'Relays'},
        { title: 'Power Supplies'},
        { title: 'Power Accessories'},
        { title: 'Fuses'},
        { title: 'Industrial Controls'},
        { title: 'Motors'},
        { title: 'Switches'},
        { title: 'Generators'},
        { title: 'Contactors'},
        { title: 'Power Distribution Equipment'},
        { title: 'Professional Audio, Video'},
        { title: 'Fuse Components'},
        { title: 'Electrical Supplies'},
        { title: 'Connectors & Terminals'},
        { title: 'Electrical Instruments & Tools'},
    ],
    "Gifts, Sports & Toys": [
        { title: 'Stickers'},
        { title: 'Wedding Decorations & Gifts'},
        { title: 'Pottery & Enamel'},
        { title: 'Cross Stitch'},
        { title: 'Souvenirs'},
        { title: 'Flags, Banners & Accessories'},
        { title: 'Money Boxes'},
        { title: 'Crafts'},
        { title: 'Music Boxes'},
        { title: 'Holiday Gifts'},
        { title: 'Lacquerware'},
        { title: 'Sculptures'},
        { title: 'Lanyard'},
        { title: 'Key Chains'},
        { title: 'Festive & Party Supplies'},
        { title: 'Knitting & Crocheting'},
        { title: 'Gift Sets'},
        { title: 'Home Decoration'},
        { title: 'Arts & Crafts Stocks'},
        { title: 'Art & Collectible'},
        { title: 'Sports Safety'},
        { title: 'Gambling'},
        { title: 'Indoor Sports'},
        { title: 'Golf'},
        { title: 'Water Sports'},
        { title: 'Fitness & Body Building'},
        { title: 'Outdoor Sports'},
        { title: 'Artificial Grass & Sports Flooring'},
        { title: 'Other Sports & Entertainment Products'},
        { title: 'Gym Equipment'},
        { title: 'Camping & Hiking'},
        { title: 'Team Sports'},
        { title: 'Musical Instruments'},
        { title: 'Amusement Park'},
        { title: 'Swimming & Diving'},
        { title: 'Winter Sports'},
        { title: 'Sports Gloves'},
        { title: 'Tennis'},
        { title: 'Scooters'},
        { title: 'Sports Souvenirs'},
        { title: 'Outdoor Toys & Structures'},
        { title: 'Inflatable Toys'},
        { title: 'Dolls'},
        { title: 'Candy Toys'},
        { title: 'Pretend Play & Preschool'},
        { title: 'Classic Toys'},
        { title: 'Electronic Toys'},
        { title: 'Glass Marbles'},
        { title: 'Action Figure'},
        { title: 'Toy Accessories'},
        { title: 'Light-Up Toys'},
        { title: 'Other Toys & Hobbies'},
        { title: 'Educational Toys'},
        { title: 'Noise Maker'},
        { title: 'Balloons'},
        { title: 'Baby Toys'},
        { title: 'Plastic Toys'},
        { title: 'Solar Toys'},
        { title: 'Toy Animal'},
        { title: 'Toy Guns'},
    ],
    "Health & Beauty": [
        { title: 'Sterilization Equipments'},
        { title: 'General Assay & Diagnostic Apparatuses'},
        { title: 'Crude Medicine'},
        { title: 'Clinical Analytical Instruments'},
        { title: 'Physical Therapy Equipments'},
        { title: 'Emergency & Clinics Apparatuses'},
        { title: 'Radiology Equipment & Accessories'},
        { title: 'Body Fluid-Processing & Circulation Devices'},
        { title: 'Traditional Patented Medicines'},
        { title: 'Medical Cryogenic Equipments'},
        { title: 'Emergency & Clinics Apparatuses'},
        { title: 'Health Care Supplement'},
        { title: 'Plant Extracts'},
        { title: 'Dental Equipment'},
        { title: 'Prepared Drugs In Pieces'},
        { title: 'Health Care Supplies'},
        { title: 'Animal Extract'},
        { title: 'Skin Care'},
        { title: 'Baby Care'},
        { title: 'Body Weight'},
        { title: 'Fragrance & Deodorant'},
        { title: 'Oral Hygiene'},
        { title: 'Men Care'},
        { title: 'Sanitary Paper'},
        { title: 'Body Art'},
        { title: 'Hair Extensions & Wigs'},
        { title: 'Feminine Hygiene'},
        { title: 'Hair Care'},
        { title: 'Makeup Tools'},
        { title: 'Beauty Equipment'},
        { title: 'Hair Salon Equipment'},
        { title: 'Makeup'},
        { title: 'Breast Care'},
        { title: 'Bath Supplies'},
        { title: 'Other Beauty & Personal Care Products'},
        { title: 'Skin Care Tool'},
        { title: 'Shaving & Hair Removal'},
        { title: 'Nail Supplies'}
    ],
}


exports.addCategories = () => {
    Object.keys(subCategories).forEach( async (key) => {
        const category = await Category.query().insert({ name: key });

        subCategories[key].map( async (subCat) => {
            const subCategory = await Category.query().insert({ category_id: category.id ,name: subCat.title });            
        });
    });
}
