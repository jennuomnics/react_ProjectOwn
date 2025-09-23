const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");



const app = express();
const PORT = 5000;
const ACCESS_SECRET = "access_secret"; // JWT secret

app.use(cors());
app.use(bodyParser.json());

// === In-memory User Storage ===
const users = [
  {
    id: uuidv4(),
    username: "admin@example.com",
    password: "admin12345",
    role: "admin",
    firstName: "Admin",
    lastName: "User",
  },
  {
    id: uuidv4(),
    username: "user@example.com",
    password: "user123",
    role: "user",
    firstName: "Regular",
    lastName: "User",
  },
];
let userIdCounter = users.length + 1;

// === In-memory Listings ===
let homes = [
  {
    id: uuidv4(),
    title: "Modern 3BHK Villa",
    location: "Bangalore",
    price: 12000,
    description: "A spacious 3BHK villa with garden and parking space.",
    imageUrl:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "2BHK Apartment in Pune",
    location: "Pune",
    price: 7500,
    description: "Compact and modern 2BHK flat in a gated society.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/55f739f4e4b0550fcc13832a/1555510104579-3OHHEQS6TW8VGNBDVWIN/remodel-building-luxury-living-shenandoah-valley-virginia",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Luxury Penthouse in Mumbai",
    location: "Mumbai",
    price: 25000,
    description: "Sea-facing penthouse with premium amenities.",
    imageUrl:
      "https://www.bellacollina.com/hubfs/Real%20Estate/Custom%20Built%20Homes.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Cozy 1BHK in Delhi",
    location: "Delhi",
    price: 4500,
    description: "Perfect for singles or couples, close to metro station.",
    imageUrl:
      "https://cdn.brookfieldresidential.net/-/media/brp/global/modules/news-and-blog/corporate/types-of-homes/detached-singlefamily-home-in-a-suburban-neighborhood--810x540.jpg?rev=574e423b4249440c803df52d3f997d75",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Independent House in Hyderabad",
    location: "Hyderabad",
    price: 9800,
    description: "3BHK independent house in a peaceful neighborhood.",
    imageUrl:
      "https://winworldrealty.in/wp-content/uploads/2024/04/Are-Homes-Becoming-Unaffordable-For-The-Middle-Class-Home-Buyers.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Affordable 2BHK in Lucknow",
    location: "Lucknow",
    price: 5200,
    description: "Affordable 2BHK with modular kitchen and balcony.",
    imageUrl:
      "https://marque.com.au/imager/uploads/images/Display-Homes/Huntingdale-Ashwood/25098/145_HUNTINGDALE_7381_2024-10-29-041408_kgtf_d41d8cd98f00b204e9800998ecf8427e.webp",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Luxury Duplex in Chandigarh",
    location: "Chandigarh",
    price: 16000,
    description: "4BHK duplex with garden, terrace, and car parking.",
    imageUrl:
      "https://foyr.com/learn/wp-content/uploads/2019/03/traditional-homes-vs-modern-homes.png",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Furnished Studio in Goa",
    location: "Goa",
    price: 3800,
    description: "Fully furnished studio apartment near beach.",
    imageUrl:
      "https://assets.architecturaldigest.in/photos/68b016d726a4bc95603bf47a/4:3/w_1600%2Ch_1200%2Cc_limit/cover%2520image%2520template%25203.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "4BHK Independent Villa in Kochi",
    location: "Kochi",
    price: 11500,
    description: "Elegant villa with private garden and smart home system.",
    imageUrl:
      "https://images.ctfassets.net/s4ybdu2ld1ox/4iGrU7mReGVZB2WV4x0YDF/6d7704ac48417104740061e858447afd/mordern-home.jpeg?w=1382&h=922&fl=progressive&q=70&fm=jpg&bg=transparent",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Smart Home in Ahmedabad",
    location: "Ahmedabad",
    price: 8900,
    description: "3BHK smart home with IoT controls and solar panels.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH7hYmd1grfUCpvThCE1poNtJDIka1FA3jKQ&s",
    addedBy: 1,
  },
];

let plots = [
  {
    id: uuidv4(),
    title: "Residential Plot in Bangalore",
    location: "Bangalore",
    price: 96000, // ₹8,000,000
    description: "2400 sqft plot in a prime residential area with road access.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsvw2Ps410NgWCK70xghydN35mwDrfxMEX2w&s",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Corner Plot in Hyderabad",
    location: "Hyderabad",
    price: 72000, // ₹6,000,000
    description: "East-facing corner plot in a gated layout.",
    imageUrl:
      "https://5.imimg.com/data5/SELLER/Default/2022/5/GS/KC/HP/11696438/residential-plot-for-sale-in-lucknow-500x500.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Farm Plot in Pune Outskirts",
    location: "Pune",
    price: 36000, // ₹3,000,000
    description: "1-acre farmland plot suitable for weekend homes.",
    imageUrl:
      "https://www.dlfproperties.org.in/project_pics/dlf-ploted-development-banner-34265.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Plot Near Beach in Goa",
    location: "Goa",
    price: 114000, // ₹9,500,000
    description: "Prime beachside plot ideal for resort or villa development.",
    imageUrl:
      "https://5.imimg.com/data5/VS/NC/GB/ANDROID-87851954/product-jpeg-500x500.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Industrial Plot in Noida",
    location: "Noida",
    price: 132000, // ₹11,000,000
    description: "Commercial/industrial plot near SEZ zone.",
    imageUrl:
      "https://5.imimg.com/data5/SELLER/Default/2023/10/355863176/PD/IA/QS/10662066/approved-residential-plots.jpg",
    addedBy: 1,
  },
];

let flats = [
  {
    id: uuidv4(),
    title: "Furnished 1BHK in Mumbai",
    location: "Mumbai",
    price: 66000, // ₹5,500,000
    description: "Compact furnished flat ideal for working professionals.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnrqWdWoi1wMW_1t1Ni_rU6K-oZrrSLFGXyuCSAL8E-bi0sbc3n3M52GMcEFD21qy__o&usqp=CAU",

    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "2BHK Flat in Chennai",
    location: "Chennai",
    price: 84000, // ₹7,000,000
    description: "Spacious flat with amenities and covered parking.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnrqWdWoi1wMW_1t1Ni_rU6K-oZrrSLFGXyuCSAL8E-bi0sbc3n3M52GMcEFD21qy__o&usqp=CAU",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Studio Apartment in Bangalore",
    location: "Bangalore",
    price: 48000, // ₹4,000,000
    description: "Modern studio in IT corridor with security and power backup.",
    imageUrl:
      "https://img.staticmb.com/mbimages/project/Photo_h310_w462/2025/08/06/Project-Photo-8-Eminence-24-Vadodara-5434953_1000_1600_310_462.jpg",

    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Luxury 3BHK in Gurgaon",
    location: "Gurgaon",
    price: 120000, // ₹10,000,000
    description: "High-rise apartment with clubhouse and pool.",
    imageUrl:
      "https://img.staticmb.com/mbimages/project/Photo_h310_w462/2025/08/06/Project-Photo-8-Eminence-24-Vadodara-5434953_1000_1600_310_462.jpg",
    addedBy: 1,
  },
  {
    id: uuidv4(),
    title: "Budget Flat in Indore",
    location: "Indore",
    price: 31200, // ₹2,600,000
    description: "Affordable 2BHK in a peaceful society with basic amenities.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS3D2O3cvP563mwxlc9BXtvfuagYBZheRByKmfCIKbsGm3LjBsfo1KVOI5XPG3Ld8jhII&usqp=CAU",
    addedBy: 1,
  },
];


// === JWT Helper ===
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, {
    expiresIn: "200m",
  });
}

// === Middleware ===
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
  };
}

// === Register User ===
app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = users.find((u) => u.username === email);
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User already exists with this email" });
  }

  const newUser = {
    id: userIdCounter++,
    username: email,
    password, // ⚠️ In production, hash this!
    role: "user",
    firstName,
    lastName,
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// === Login User ===
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (u) => u.username === email && u.password === password
  );
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
});

// === CRUD Handler for Homes, Plots, Flats ===
function createCrudRoutes(entityName, storageArray) {
  // Get all
  app.get(`/api/${entityName}`, authenticateToken, (req, res) => {
    res.json(storageArray);
  });

  // Add new (Admin only)
  app.post(
    `/api/${entityName}`,
    authenticateToken,
    authorizeRole("admin"),
    (req, res) => {
      const { title, location, price, description, imageUrl } = req.body;
     
      if (!title || !location || !price || !description || !imageUrl) {
        console.log(!title, !location , !price , !description , !imageUrl);
         console.log(req.body);
        return res
          .status(400)
          .json({ message: "All fields including imageUrl are required" });
      }

      const newItem = {
        id: storageArray.length + 1,
        title,
        location,
        price,
        description,
        imageUrl,
        addedBy: req.user.id,
      };

      storageArray.push(newItem);
      res.status(201).json(newItem);
    }
  );

  // Update (Admin only)
  app.put(
    `/api/${entityName}/:id`,
    authenticateToken,
    authorizeRole("admin"),
    (req, res) => {
      const itemId = parseInt(req.params.id);
      const item = storageArray.find((i) => i.id === itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });

      const { title, location, price, description, imageUrl } = req.body;

      item.title = title ?? item.title;
      item.location = location ?? item.location;
      item.price = price ?? item.price;
      item.description = description ?? item.description;
      item.imageUrl = imageUrl ?? item.imageUrl;

      res.json(item);
    }
  );

  // Delete (Admin only)
  app.delete(
    `/api/${entityName}/:id`,
    authenticateToken,
    authorizeRole("admin"),
    (req, res) => {
      const itemId = parseInt(req.params.id);
      const index = storageArray.findIndex((i) => i.id === itemId);
      if (index === -1)
        return res.status(404).json({ message: "Item not found" });

      storageArray.splice(index, 1);
      res.json({ message: `${entityName.slice(0, -1)} deleted successfully` });
    }
  );
}

// === Create Routes for Homes, Plots, Flats ===
createCrudRoutes("homes", homes);
createCrudRoutes("plots", plots);
createCrudRoutes("flats", flats);

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
