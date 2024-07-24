require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );
    const indian = await Recipe.find({ category: "Indian" }).limit(limitNumber);

    const food = { latest, thai, american, chinese, indian };

    res.render("index", { title: "Recipe Blog - Home", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// categories

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", { title: "Recipe Blog - Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// categories/:id
const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh", "Jharkhand", "Jammu & Kashmir","Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    if (categoryId === "Indian") {
      res.render("indianStates", { title: "Indian States", indianStates });
    } else {
      const categoryById = await Recipe.find({ category: categoryId }).limit(
        limitNumber
      );

      res.render("categories", {
        title: "Recipe Blog - Categories",
        categoryById,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// recipe/:id
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    res.render("recipe", { title: "Recipe Blog - Categories", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// searchRecipe
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    console.log("Search Term:", searchTerm);

    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Recipe Blog - Search", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// exploreLatest

exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", { title: "Recipe Blog - Recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// ExploreRandom

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("explore-random", { title: "Recipe Blog - Recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// SUbmit recipe

exports.submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");

  res.render("submit-recipe", {
    title: "Recipe Blog - Recipe",
    infoSubmitObj,
    infoErrorsObj,
  });
};

// Submit recipe post

exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadpath;
    let newImageName;
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No Files was uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadpath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadpath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      Username : req.body.Username,
      state: req.body.state,
      image: newImageName,
    });
    await newRecipe.save();
    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoErrors", error);
    console.log("err", error);
    res.redirect("/submit-recipe");
  }
};



exports.exploreRecipesByState = async (req, res) => {
  try {
    let state = req.params.state;
    const recipesByState = await Recipe.find({
      category: "Indian",
      state: state,
    });
    res.render("recipesByState", {
      title: `Recipes from ${state}`,
      recipesByState,
      state,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.Aboutus = async (req, res) => {
  try {
    res.render('Aboutus', { title: 'About Us' });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}
