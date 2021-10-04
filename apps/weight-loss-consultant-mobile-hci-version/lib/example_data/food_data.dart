class Food {
  String name;
  String unit;
  String videoPath;
  String thumbnailPath;
  String details;

  Food(this.name, this.unit, this.videoPath, this.thumbnailPath, this.details);
}

class FoodList {
  static var wholeGrainCereal = Food(
      'Whole Grain Cereal',
      '248,0 calories/ 100 grams',
      'https://www.youtube.com/watch?v=I3idA1MBxkI',
      'https://static.wixstatic.com/media/f7e85b_f068e857520546db86fc178c9034beea~mv2.jpg/v1/fill/w_1000,h_1000,al_c,q_90,usm_0.66_1.00_0.01/f7e85b_f068e857520546db86fc178c9034beea~mv2.jpg',
      'Saturated fats take longer to digest and can affect the amount of oxygen your blood delivers to your muscles.');
  static var energyBar = Food(
      "Energy Bar",
      "200,0 calories/ 100 grams",
      "https://www.youtube.com/watch?v=k-x2eFdQZas",
      "https://www.active.com/Assets/Nutrition/620/energy-bars.jpg",
      'When you’re working out later in the day, have a small snack about an hour before you get started.'
          ' A sports bar that has 200 calories or less is a good option.');
  static var grilledChicken = Food(
      "Grilled Chicken",
      "226,1 calories/ 100 grams",
      "https://www.youtube.com/watch?v=oWXlmAeqoUE",
      "https://hips.hearstapps.com/hmg-prod/images/grilled-chicken-horizontal-1532030541.jpg",
      "When you exercise regularly, you need more protein than people who don’t, especially after a workout."
          " Your body uses it to repair muscles, to make blood cells, and for many other purposes. For lunch or dinner, serve a leaner source,"
          " like grilled chicken or turkey, instead of something like a cheeseburger.");
  static var blackBeanBurger = Food(
      "Black Bean Burger",
      "120 calories/ 100 grams",
      "https://www.youtube.com/watch?v=_BJoree8urg",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/best_foods_fitness_slideshow/493ss_Thinkstock_rf_black_bean_quinoa_burger.jpg",
      "Whether you sometimes try a meat-free meal or stick to a full-time vegetarian diet, you can get plenty of protein (and lots of other nutrients, including fiber) from plants. Try pinto, kidney, white, or black beans, split peas, or chickpeas."
          " Soy products, like tofu and temper, and nuts also have protein.");
  static var peanutButter = Food(
      "Peanut Butter",
      "588,4 calories/ 100 grams",
      "https://www.youtube.com/watch?v=P0KWc5nANKg",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/best_foods_fitness_slideshow/493ss_Thinkstock_rf_peanut_butter.jpg",
      "While you train for a big event, the ideal post-workout snack combines protein with carbs. Revisit your childhood with a sandwich made with 2 slices of bread and 4 tablespoons of peanut butter. Of course, now that you’re an adult, you can substitute almond butter."
          " Or try two or three cooked eggs for protein with a half a bagel.");
  static var waterAndSportsDrink = Food(
      "Water or a Sports Drink",
      "0 calories/ 100 grams",
      "https://www.youtube.com/watch?v=kehS5f3Fe5I",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/best_foods_fitness_slideshow/493ss_Thinkstock_rf_woman_drinking_water.jpg",
      "Hydration is a must when you exercise. Often, water is all you need. "
          "But it depends on what you are doing. If your activity is less than 60 minutes, "
          "sip small amounts of water often to replace lost fluids. "
          "But when your workout is intense and lasts longer than an hour, a sports drink could help your hydration and your performance. "
          "Just keep an eye on the calories and sugar, like with any other drink, especially if you want to lose weight.");
  static var fish = Food(
      "Fish",
      "205,8 calories/ 100 grams",
      "https://www.youtube.com/watch?v=uNGfc0o_U8g",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/healthy_fat_foods_slideshow/getty_rf_photo_of_mackerel.jpg",
      "Naturally fatty fish like salmon, mackerel, herring, lake trout, sardines, and albacore tuna are good sources of omega-3 fatty acids. They may also help keep your brain sharp, especially as you get older. The American Heart Association suggests eating two servings of fatty fish a week. A serving is 3 ounces"
          " -- about the size of a deck of cards. Try it baked, grilled, or poached.");
  static var seeds = Food(
      "Seeds",
      "559 calories/ 100 grams",
      "https://www.youtube.com/watch?v=uqlRMGvU9os",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/healthy_fat_foods_slideshow/getty_rm_photo_of_sunflower_seeds.jpg",
      "Little pumpkin seeds, sunflower seeds, and sesame seeds pack a big punch."
          " In general, fats that come from plants are healthier than those from animal products.");
  static var oliveOil = Food(
      "Olive Oil",
      "884,1 calories/ 100 grams",
      "https://www.youtube.com/watch?v=31tMLbVTrcA",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/healthy_fat_foods_slideshow/getty_rf_photo_of_olive_oil.jpg",
      "Whether you're cooking or dressing your salad, try olive oil. It's high in good fat."
          " Remember, though: It's always smart to watch how much fat -- even good fat -- you eat."
          " So cook with less oil than a recipe calls for. Or use an olive oil spray. In baking,"
          " you can use applesauce for half the oil to cut back on some fat and shave calories.");
  static var eggs = Food(
      "Eggs",
      "155,1 calories/ 100 grams",
      "https://www.youtube.com/watch?v=qWAagS_MANg",
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/healthy_fat_foods_slideshow/getty_rm_photo_of_fried_egg.jpg",
      "Eggs are a great source of inexpensive protein. A large, hard-boiled egg has about 4.7 grams of fat,"
          " most from healthy fats. Some eggs are also enriched with extra omega-3s. It will say so on the carton");
  static var milk = Food(
      'Milk',
      '42 calories / 100 grams',
      'https//www.youtube.com/watch?v=ydoK2QE65T0',
      'https//images.immediate.co.uk/production/volatile/sites/30/2020/08/milk-91fa837.jpg?quality=90&resize=620%2C310',
      "With hydrating water, muscle-healing protein, refuelling sugar and bone-healthy calcium in every glass,"
          " milk is great for those upping their activity levels.  A warm glass around bedtime may also help you drift off and get the rest you need, "
          "thanks to its slow-digesting casein proteins and ability to boost sleep-inducing serotonin and melatonin.");
  static var driedFruit = Food(
      "Dried Fruit",
      "359,5 calories / 100 grams",
      "https//www.youtube.com/watch?v=kjLWtgOpOL4",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/energy_balls-987836b.jpg?quality=90&resize=620%2C310",
      "High in natural sugars, dried fruits (such as apricots, raisins and mango) give a concentrated source of carbohydrate,"
          " making them great energy booster. You’ll also get a dose of fibre, potassium, phytonutrients,"
          " vitamins and minerals with every mouthful.");
  static var broccoli = Food(
      "Broccoli",
      "35 calories / 100 grams",
      "https//www.youtube.com/watch?v=OxLWJ3iZLyg",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/broccoli_0-02ac657.jpg?quality=90&resize=620%2C310",
      "With free-radical-busting antioxidants, digestion-promoting fibre, plus a whole army of vitamins and minerals,"
          " broccoli along with kale, spinach and green cabbage are some of the most nutrient-dense foods you’ll find in the supermarket."
          " They are also a great source of folate (a natural-occurring folic acid),"
          " which is thought to be good for heart health and for women hoping to conceive.");
  static var sweetPotatoes = Food(
      "Sweet potatoes",
      "85,8 calories / 100 grams",
      "https//www.youtube.com/watch?v=mo2mTQ6sQgc",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/sweet-potato-7cca5f9.jpg?quality=90&resize=620%2C310",
      "Mash, bake or make into pate – sweet potatoes are ultra versatile and are a healthier choice than regular potatoes,"
          " with disease-fighting beta-carotene, iron, fibre and vitamin C.Sweet potatoes "
          "are a good addition to a carb-loading diet before a long race, such as a half marathon. "
          "They are also high in the electrolyte potassium, which can help ward off muscle cramping during exercise.");
  static var tomatoes = Food(
      "Tomatoes",
      "17,7 calories / 100 grams",
      "https//www.youtube.com/watch?v=48DD3kekP3E",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/tomato_salad-72d389a.jpg?quality=90&resize=620%2C310",
      "As well as being loaded with vitamin C, tomatoes contain a powerful antioxidant called lycopene, which gives the fruit their"
          " lovelyletterbox-red colour."
          "Lycopene has been making headlines for a few years now as a powerful nutrient to help prevent prostate cancer in men.");
  static var bananas = Food(
      "Bananas",
      "88,7 calories / 100 grams",
      "https//www.youtube.com/watch?v=uUv3cby4yMI",
      "https//i.ytimg.com/vi/uUv3cby4yMI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDG-w-KDkHdk-IuNbXIvIX5jI1bTQ",
      "Bananas are the perfect fitness food compact, unfussy, soft to chew, and packed with nutrients. "
          "Don’t be too quick to bin the peel however – Taiwanese nutritionists found the peel is not only packed with even more potassium, "
          "but mood-boosting serotonin and eye-protecting lutein, too. Try the whole banana – peel and all – in a smoothie.");
  static var brazilNuts = Food(
      "Brazil nuts",
      "655,6 calories / 100 grams",
      "https//www.youtube.com/watch?v=2OjtLJ95xys",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/the-health-benefits-of-brazil-nuts-main-image-700-350-554b0a5.jpg?quality=90&resize=620%2C310",
      "All nuts are packed with vitamins, minerals and fibre, but Brazil nuts are also one of the few good sources of selenium,"
          " a mineral and micronutrient which helps to maintain a healthy immune system and can help protect against heart disease and cancers. "
          "The heart-healthy ‘good’ fats in nuts help to lower bad cholesterol levels, but be wary they can be high in calories if you nibble too many.");
  static var blueberries = Food(
      "Blueberries",
      "57,4 calories / 100 grams",
      "https//www.youtube.com/watch?v=-ZXaUBDSiAQ",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/blueberries-43a2559.jpg?quality=90&resize=620%2C310",
      "Blueberries earned their ‘superfood’ status a few years ago, thanks to their high level of free-radical-beating antioxidants. "
          "Free radicals are thought to travel around your body damaging cells, causing disease, and triggering signs of premature aging. "
          "Berries are often lower in calories than other fruits, too.");
  static var salmon = Food(
      "Salmon",
      "208,2 calories / 100 grams",
      "https//www.youtube.com/watch?v=b0ahREpQqsM",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/salmon-215f85a.jpg?quality=90&resize=620%2C310",
      "Salmon is a good source of Omega 3, a fatty acid that’s believed to keep your heart healthy and slow down the effects of memory loss.");
  static var cocoa = Food(
      "Cocoa",
      "227,5 calories / 100 grams",
      "https//www.youtube.com/watch?v=pn-W0DVQw8Y",
      "https//images.immediate.co.uk/production/volatile/sites/30/2020/08/chocolate_sorbet-29d786b.jpg?quality=90&resize=620%2C310",
      "Cocoa is especially nutritious, rich in magnesium, antioxidants and amino acids."
          " To get the full benefit you need to get as close to the whole bean as possible."
          " Cocoa nibs or powder are best – sprinkle on yoghurt, fruit or add to granola.");
  static var artichokes = Food(
      "Artichokes",
      "47,1 calories / 100 grams",
      "https//www.youtube.com/watch?v=ygyzb8BQ0Ec",
      "https//www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/859274371/artichokes.jpg?resize=640,468&quality=82&strip=all",
      "Ghrelin is your body hormone, which is suppressed when your stomach is full, so eating satiating high-fiber and high-protein foods is a no-brainer. "
          "The humble artichoke is a winner on both counts It has almost twice as much fiber as kale"
          " (10.3 g per medium artichoke, or 40 percent of the daily fiber the average woman needs) and one of the highest protein counts among vegetables. "
          "Boil and eat the whole shebang as a self-contained salad (why not add a little goat cheese and sun-dried tomatoes?),"
          " toss the leaves with your favorite greens and dressing, or peel and pop the hearts onto healthy pizzas and flatbreads and lose belly fat.");
  static var carrots = Food(
      "Carrots",
      "41 calories / 100 grams",
      "https//www.youtube.com/watch?v=xoQX8qdq1x4",
      "https//www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/868845328/raw-carrots.jpg?resize=640,468&quality=82&strip=all",
      "Carrots are an excellent source of vitamin A, vitamin C, vitamin K, potassium, and fiber, and thats just the tip of the nutritional iceberg."
          " Beta-carotene—the compound that gives carrots their orange hue—has been linked to a decreased risk for developing certain types of cancer."
          " Per an American Journal of Clinical Nutrition study of over 3,000 women, "
          "those who had higher levels of beta-carotene in their blood had a 59 percent lower risk of a certain type of breast cancer "
          "(ER-negative breast cancer) than women with lower levels.Another related compound also found in carrots, alpha-carotene,"
          " reduced the cancer risk by about 39 percent.");
  static var pickles = Food(
      "Pickles",
      "10,5 calories / 100 grams",
      "https//www.youtube.com/watch?v=LBvr0K-6NIY",
      "https//www.eatthis.com/wp-content/uploads/sites/4/2018/04/pickles-in-jar.jpg?resize=640,468&quality=82&strip=all",
      "Pickles are low-cal, filled with fiber and covered in vinegar—which is all good news for your waistline."
          " In fact, just one large pickle has 15 calories and 2 grams of belly-filling fiber,"
          " so eating three or four can actually leave you feeling pretty satiated for less than 100 calories! "
          "Every dieter knows that eating filling snacks are paramount to weight-loss success, "
          "but how does the vinegar help the fat-fighting cause? "
          "Studies show acidic foods help increase the rate at which the body burns off carbs by up to 40 percent—and the faster you burn off carbs,"
          " the sooner your body starts incinerating fat,which can help you get that lean look you crave."
          " Add these tangy, pickled cucumbers to sandwiches and burgers or munch on them solo to start feeling more confident in your skivvies.");
  static var onions = Food(
      "Onions",
      "39,7 calories / 100 grams",
      "https//www.youtube.com/watch?v=6WPCNqUy9ls",
      "https//www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/749064324/sliced-onions.jpg?resize=640,468&quality=82&strip=all",
      "Onions are rich in quercetin, a flavonoid that increases blood flow and activates a protein in the body that helps regulate glucose levels, torches stored fat and keeps new fat cells from forming. "
          "Not to mention, onions are basically the unsung hero of cardiovascular health—an important area of wellness for everyone,"
          " but especially those who hit the gym hard to accelerate their weight-loss efforts. "
          "The culinary staple can help lower cholesterol, ward off hardening of the arteries and help maintain healthy blood pressure levels. "
          "The best part? Onions are super low-cal and easy to throw into just about anything,from soups, homemade burgers, sandwiches and tacos to pastas, salads,"
          " veggie sides, rice and omelets.");
  static var mushrooms = Food(
      "Mushrooms",
      "22,2 calories / 100 grams",
      "https//www.youtube.com/watch?v=ktrwSUhWDDE",
      "https//www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/117560873/wild-mushrooms.jpg?resize=640,468&quality=82&strip=all",
      "Mushrooms are considered health food all-stars because they are a great source of potassium,"
          " which is vital for muscle health and recovery and can also lower blood pressure and decrease the effects of a high-sodium meal. "
          "In addition to being low-cal and fat-free, research has shown eating fungi can lead to increased immy and protect against cancer. "
          "One study printed in the journal 3Biotech that compared the effects of mushroom extract on mice found that those "
          "treated with the extract experienced reductions in prostate tumor size and tumor cell proliferation compared to the control "
          "group of mice that were not treated.");
  static var eggPlant = Food(
      "Eggplant",
      "24,9 calories / 100 grams",
      "https://www.youtube.com/watch?v=5dxoqb_r1Nc",
      "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/252522420/grilled-eggplant.jpg?resize=640,468&quality=82&strip=all",
      "According to a review published in the journal Molecular Nutrition & Food Research anthocyanins,"
          " flavonoids that give eggplants their unique color, will provide you with an array of impressive benefits. "
          "Said perks include but are not limited to obesity control, diabetes control, cardiovascular disease prevention,"
          " and improvement of visual and brain functions such as a sharper short-term memory and reduced inflammation. "
          "Go ahead and toss some of this yummy veggie into a stir-fry or make some babaganoush—an eggplant-based spread with fewer calories than hummus.");
  static var spirulina = Food(
      "Spirulina",
      "289,9 calories / 100 grams",
      "https://www.youtube.com/watch?v=4SkowTSjkQc",
      "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/231417587/spirulina-powder.jpg?resize=640,468&quality=82&strip=all",
      "Spirulina is a high-protein seaweed supplement thats typically dried and sold in powdered form. "
          "The dried stuff is about 60 percent protein, and, like quinoa, its a complete protein,meaning it"
          " can be converted directly into muscle in the body and is thus a great weight loss tool. "
          "A tablespoon of the blue-green algae delivers 8 grams of metabolism-boosting protein for just 43 calories, "
          "plus half a days allotment of vitamin B12, which in and of itself can give you more energy and boost your metabolism. "
          "Try tossing some spirulina into a smoothie and watching the pounds melt off.");
  static var avocado = Food(
      "Avocado",
      "160,1 calories / 100 grams",
      "https://www.youtube.com/watch?v=FMGArdg4-pY",
      "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/291840226/avocado-ripe.jpg?resize=640,468&quality=82&strip=all",
      "Though somewhat villainized for being high in calories, avocados are more than worthy of a role in your diet. "
          "Just half of an avocado contains 4.6 grams of belly-filling fiber, "
          "and the green fruits satiating powers are so potent that a study in Nutrition Journal "
          "discovered that folks who added half a fresh avocado to their meal reported a 40 percent decreased desire to eat "
          "for hours afterward.Furthermore, avocados contain metabolism-enhancing monounsaturated fats that have been shown "
          "to reduce hunger, and unsaturated fats, which seem to prevent the storage of belly fat. "
          "In fact, according to a review that appeared in the journal Phytotherapy Research, "
          "avocados may help combat metabolic syndrome, which is a clustering of risk factors including high blood sugar, "
          "cholesterol, blood pressure, and body mass index that may then lead to an increased risk of type 2 diabetes and cardiovascular disease.");
  static var blackSapote = Food(
      "Black Sapote",
      "134 calories / 100 grams",
      "https://www.youtube.com/watch?v=nMFEOPOdsyw",
      "https://www.eatthis.com/wp-content/uploads/sites/4/2018/04/black-sapote-chocolate-pudding-fruit.jpg?resize=640,468&quality=82&strip=all",
      "Known as the chocolate pudding fruit, black sapote tastes like … chocolate pudding. No wonder its an Eat This,Not That! "
          "favorite! Deceptively rich and creamy, a 100-gram serving has 130 calories and 191 mg of vitamin C, "
          "or twice that of an orange. (Thats a mic drop, chocolate pudding.)A study published in "
          "Food Research International found black sapote to be a good source of carotenoids and catechins, "
          "which spur the release of fat from fat cells and helps the liver convert fat into energy.");
  static var kiwi = Food(
      "Kiwi",
      "60,9 calories / 100 grams",
      "https://www.youtube.com/watch?v=mbullSpkKSY",
      "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/931197796/sliced-kiwi.jpg?resize=640,468&quality=82&strip=all",
      "Backed up and bloated? Snack on kiwi. The green fruit can help you get in tip-top shape thanks to its ability to aid digestion."
          " Though small, kiwifruit contains a hefty amount of actinidin, a natural enzyme that helps facilitate digestion by breaking down protein in the body. "
          "The tropical fruit also contains prebiotic fiber, which primes the gut for healthy digestion. "
          "In fact, according to a 2015 study published in Nutrition Research, a daily serving of green kiwifruit helps increase bowel movements.");

  static List<Food> listFood = [
    wholeGrainCereal,
    energyBar,
    grilledChicken,
    blackBeanBurger,
    peanutButter,
    waterAndSportsDrink,
    fish,
    seeds,
    oliveOil,
    eggs,
    milk,
    driedFruit,
    broccoli,
    sweetPotatoes,
    tomatoes,
    bananas,
    brazilNuts,
    blueberries,
    salmon,
    cocoa,
    artichokes,
    carrots,
    pickles,
    onions,
    mushrooms,
    eggPlant,
    spirulina,
    avocado,
    blackSapote,
    kiwi,
  ];
}
