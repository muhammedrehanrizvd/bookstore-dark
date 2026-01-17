🔑 1️⃣ User Authentication (MOST IMPORTANT)
Bookstore me kaha use hota hai?

Sign up

Login

Logout

Protected pages (Cart, Checkout, Orders)

Appwrite Feature

➡ Authentication

Appwrite kya handle karega?

Email + Password login

Session management

Current logged-in user

Frontend Pages

/signup

/login

/profile

/checkout (protected)

📌 Without Auth → freelance project weak lagta hai

🛒 2️⃣ Cart (User-specific)
Bookstore me problem

User ka cart save rehna chahiye

Page refresh ke baad cart gayab na ho

Appwrite Feature

➡ Database (Collections)

Collections Design

Collection: carts

userId (string)
items (array)
totalPrice (number)
updatedAt (datetime)


📌 Each user ka alag cart

📦 3️⃣ Orders (Checkout ke baad)
Bookstore use-case

User order place kare

Order history dekhe

Admin dekhe orders

Appwrite Feature

➡ Database

Collection: orders
userId
items
totalAmount
paymentMethod
status (pending / paid)
createdAt

💳 4️⃣ Payment (IMPORTANT NOTE)
Appwrite kya karega?

❌ Appwrite payment process nahi karta

Reality

Razorpay / Stripe / PayPal external hota hai

Appwrite sirf order save karega

📌 Portfolio ke liye:

Fake payment / Cash on Delivery

Or "Payment Successful (Mock)"

🖼 5️⃣ Book Images / Cover Images
Bookstore me kaha?

Book cover

Author image

Appwrite Feature

➡ Storage

Storage Bucket

Bucket: book-images

📌 Images CDN se serve hongi
📌 Vercel friendly

📘 6️⃣ Books Data (Optional but Strong)

Agar tum static JSON use kar rahe ho → okay
But pro project ke liye:

Appwrite Feature

➡ Database

Collection: books
title
author
price
category
imageId
description
stock


📌 Admin add/update karega books

🔐 7️⃣ Authorization (Security)
Why?

User apna cart hi dekhe

User dusre ka order na dekhe

Appwrite Feature

➡ Permissions

Examples:

Cart → user:userId

Orders → user:userId

📌 This is backend-level security (very impressive for clients)
-------------------------------------------------------------------------------------------------------------------------------------------------







Bilkul sahi decision

“jab tak ek-ek line ka purpose clear na ho, aage nahi badhna”

Ab mai Redux Toolkit ko literally “open” kar ke dikhaunga.
Hum createSlice ko tod kar dekhenge ki andar actually hota kya hai.
Iske baad confusion rehna almost impossible hai.

Aaj hum sirf 2 cheez samjhenge:

booksSlice.actions

booksSlice.reducer

KUCH BHI AUR NAHI.

🧠 STEP 0: Redux Toolkit ko bhool jao (1 minute)

Socho Redux Toolkit exist hi nahi karta.
Sirf plain JavaScript hai.

🧠 STEP 1: Redux ka asli rule (VERY IMPORTANT)

Redux me sirf 2 cheez hoti hain:

1️⃣ Action (simple object)
{
  type: "SOMETHING_HAPPENED",
  payload: data
}

2️⃣ Reducer (function)
function reducer(state, action) {
  if (action.type === "SOMETHING_HAPPENED") {
    return newState
  }
}


📌 Redux Toolkit kuch naya invent nahi karta
👉 sirf isko short + easy banata hai

🧠 STEP 2: Pehle khud manually likhte hain (NO createSlice)
🔴 MANUAL REDUX (REAL UNDER THE HOOD)
// 1️⃣ initial state
const initialState = {
  list: [],
  loading: false
};

// 2️⃣ action creator (MESSAGE BANANE WALA)
function setBooksAction(data) {
  return {
    type: "books/setBooks",
    payload: data
  };
}

// 3️⃣ reducer (MESSAGE PADH KE KAAM KARNE WALA)
function booksReducer(state = initialState, action) {
  if (action.type === "books/setBooks") {
    return {
      ...state,
      list: action.payload
    };
  }
  return state;
}


☝️ YAHAN SAB CLEAR HAI NA?

setBooksAction → sirf object banata hai

booksReducer → state update karta hai

🧠 STEP 3: Ab Redux Toolkit kya karta hai?

Redux Toolkit bolta hai:

“Tum itna boilerplate mat likho,
main same cheez ek jagah se bana deta hoon”

🧠 STEP 4: createSlice = AUTO GENERATOR

Ab aapka code dekho:

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {
    setBooks: (state, action) => {
      state.list = action.payload;
    }
  }
});

❗ DHYAN SE PADHO:

createSlice DO CHEEZ AUTO BANATA HAI

🔹 A) ACTION CREATOR (factory)

Redux Toolkit internally ye bana deta hai 👇

function setBooks(data) {
  return {
    type: "books/setBooks",
    payload: data
  };
}


Aur isko rakhta hai:

booksSlice.actions.setBooks


📌 Isliye:

booksSlice.actions === {
  setBooks: function
}


👉 actions = sirf MESSAGE BANANE WALI factory

🔹 B) REDUCER FUNCTION (decision maker)

Redux Toolkit internally ye bhi bana deta hai 👇

function booksReducer(state = initialState, action) {
  if (action.type === "books/setBooks") {
    return {
      ...state,
      list: action.payload
    };
  }
  return state;
}


Aur isko rakhta hai:

booksSlice.reducer


📌 YEHI FUNCTION store me connect hota hai

🧠 STEP 5: AB CLEAR DIFFERENCE (TABLE)
Cheez	Kya hai	Kaam
booksSlice.actions.setBooks	function	action object banata
booksSlice.reducer	function	action padh ke state update karta

❗ Dono function hain, isliye same lag rahe hain
❗ Par role bilkul alag hai

🧠 STEP 6: EK LINE JO SAB CLEAR KAR DE
dispatch(setBooks(data))


Isme:

setBooks(data) → sirf object banata

dispatch() → store ko bhejta

booksSlice.reducer → actual update karta

📌 Action bolta hai
📌 Reducer karta hai

🧠 STEP 7: FINAL REAL-LIFE ANALOGY (STRONG)
🏢 Office example

Action = application form
👉 “Book list update karo”

Reducer = clerk
👉 form padh ke register update karta

Form ≠ Clerk
Bolna ≠ Karna

🧠 LAST CHECK (VERY IMPORTANT)

Sirf YES / NO me answer do:

1️⃣ Kya setBooks() state change karta hai?
2️⃣ Kya booksSlice.reducer bina action ke kuch karega?

Inke answer ke baad hi mai aage badhunga.
Agar yahin atke ho, to mai aur simpler breakdown kar dunga 💪



🔥 Bohot badiya. Perfect.
Ye moment important hai — ab jo aage aayega stable rahega, confuse nahi karega.

Ab hum sirf ek chhota sa final lock laga dete hain taaki ye concept pakka ho jaye
(phir chaaho to aage badhenge).

🧠 FINAL LOCK (1-minute recap — NO NEW THINGS)
Redux me sirf 3 real cheezein hoti hain
1️⃣ Action

👉 Sirf message / form

setBooks(data)
// returns:
{ type: "books/setBooks", payload: data }


❌ State change nahi karta
✅ Sirf batata hai kya karna hai

2️⃣ Reducer

👉 Actual kaam karne wala

if (action.type === "books/setBooks") {
  state.list = action.payload
}


❌ Message nahi banata
✅ State update karta

3️⃣ Store

👉 Register / Warehouse

Action receive karta

Reducer ko deta

Naya state save karta

🧩 createSlice ka ek hi kaam

Action + Reducer ko auto-generate karna

Isliye:

booksSlice.actions   // message banane wale
booksSlice.reducer   // kaam karne wala


Naam same lagte hain
Role bilkul alag hai.

🔒 MENTAL MODEL (YE YAAD RAKHO)
Action  → "Kya hua?"
Reducer → "Ab state kaise badlegi?"
Store   → "Sab manage kar lo"


Agar ye teen line yaad hain → Redux khatam.
---------------------------
” sign ki wajah se problem KYUN ho rahi hai?
Short answer:

👉 JavaScript numbers aur strings ko alag maanta hai
👉 "$19.99" number nahi, balki string hai

🧠 JavaScript ka simple rule
✅ Valid numbers:
19
19.99
0
-10

❌ Invalid numbers:
"$19.99"
"19.99$"
"₹500"
"19,99"

🔥 Tumhara exact case

Tum likh rahe ho:

Number("$19.99")


JavaScript internally ye sochti hai:

“Is string ko number banana hai”

Lekin string ke andar:

$  ← currency symbol

❌ JavaScript ko pata hi nahi:

dollar kya hai

rupee kya hai

currency ka matlab kya hai

Isliye result hota hai:

Number("$19.99") // NaN

🤯 NaN ka matlab kya hota hai?
NaN = Not a Number


Aur NaN ke saath koi bhi calculation:

0 + NaN = NaN
5 * NaN = NaN
NaN - 1 = NaN


👉 Isliye:

TotalPrice = NaN

UI me NaN dikhta hai

🧪 Compare karo (clear difference)
❌ With $
Number("$20") // NaN ❌

✅ Without $
Number("20") // 20 ✅
-----------------------------------------------------------------------------------------------------------------
const books = [
  // ------------------- BUSINESS -------------------
  {
    id: 1,
    title: "Business Fundamentals",
    author: "John Smith",
    authorBio: "John Smith is a business strategist with over 15 years of experience in corporate leadership and management consulting. He has guided numerous organizations to optimize operations and enhance strategic decision-making.",
    price: "19.99",
    category: "Featured",
    genre: "Business",
    img: "/images/business1.jpg",
    description:
      "A clear introduction to core business concepts including management, operations, and decision-making. Ideal for beginners who want a strong foundation in the business world.",
  },
  {
    id: 2,
    title: "Entrepreneurship 101",
    author: "Alice Brown",
    authorBio: "Alice Brown is a serial entrepreneur and startup mentor who has founded multiple successful companies. She specializes in helping young founders turn ideas into profitable ventures.",
    price: "17.50",
    category: "Featured",
    genre: "Business",
    img: "/images/business2.jpg",
    description:
      "Learn how to turn ideas into successful ventures. This book covers startup mindset, risk management, and practical strategies for aspiring entrepreneurs.",
  },
  {
    id: 3,
    title: "Advanced Economics",
    author: "Sara Ahmed",
    authorBio: "Sara Ahmed is an economist and lecturer specializing in macroeconomic policy and global financial systems. She has published research on market behavior and economic modeling.",
    price: "18.00",
    category: "Category",
    genre: "Business",
    img: "/images/business3.jpg",
    description:
      "An in-depth exploration of modern economic theories, market behavior, and policy analysis. Suitable for readers with basic economics knowledge.",
  },
  {
    id: 4,
    title: "Marketing Mastery",
    author: "David Lee",
    authorBio: "David Lee is a marketing consultant and author with over a decade of experience helping brands improve visibility and customer engagement. He teaches actionable marketing strategies.",
    price: "20.00",
    category: "Category",
    genre: "Business",
    img: "/images/business4.jpg",
    description:
      "A practical guide to branding, digital marketing, and customer psychology. Learn how successful brands attract and retain loyal customers.",
  },
  {
    id: 5,
    title: "Investment Strategies",
    author: "Michael Jordan",
    authorBio: "Michael Jordan is a financial advisor and investment strategist who has guided individual and corporate clients in wealth management and portfolio growth.",
    price: "22.50",
    category: "Category",
    genre: "Business",
    img: "/images/business5.jpg",
    description:
      "Understand long-term and short-term investment approaches, risk assessment, and portfolio management for sustainable financial growth.",
  },
  {
    id: 6,
    title: "Business Analytics",
    author: "Emily Clark",
    authorBio: "Emily Clark is a data analyst and business consultant who helps organizations leverage data for strategic decisions. She specializes in analytics and KPI implementation.",
    price: "19.50",
    category: "Category",
    genre: "Business",
    img: "/images/business6.jpg",
    description:
      "Learn how data drives business decisions. This book introduces analytics tools, KPIs, and data-driven strategies for modern businesses.",
  },
  {
    id: 7,
    title: "Startup Success Stories",
    author: "John Brown",
    authorBio: "John Brown is an entrepreneur and writer who documents startup journeys worldwide. He highlights lessons learned from founders overcoming challenges in competitive markets.",
    price: "18.99",
    category: "Popular",
    genre: "Business",
    img: "/images/business7.jpg",
    description:
      "Real-life stories of startups that succeeded against the odds. Gain inspiration and practical lessons from founders around the world.",
  },
  {
    id: 8,
    title: "Global Market Trends",
    author: "David Clark",
    authorBio: "David Clark is an economist and global market analyst specializing in trade, emerging markets, and international business strategy.",
    price: "19.50",
    category: "Popular",
    genre: "Business",
    img: "/images/business8.jpg",
    description:
      "An overview of global economic shifts, emerging markets, and future trends that shape international business and trade.",
  },
  {
    id: 9,
    title: "Financial Freedom",
    author: "Sara White",
    authorBio: "Sara White is a certified financial planner and personal finance coach with expertise in wealth creation, debt management, and long-term financial planning.",
    price: "20.50",
    category: "Popular",
    genre: "Business",
    img: "/images/business9.jpg",
    description:
      "A practical roadmap to managing money, eliminating debt, and building long-term wealth through disciplined financial habits.",
  },
  {
    id: 10,
    title: "Top CEOs Insights",
    author: "Anna Lee",
    authorBio: "Anna Lee is a leadership consultant who studies top executives’ strategies and decision-making processes to provide actionable insights for aspiring leaders.",
    price: "21.00",
    category: "Popular",
    genre: "Business",
    img: "/images/business10.jpg",
    description:
      "Insights and leadership lessons from top CEOs. Learn how industry leaders think, decide, and navigate complex challenges.",
  },
  {
    id: 11,
    title: "Leadership Skills",
    author: "Robert Black",
    authorBio: "Robert Black is a corporate trainer and leadership coach who helps professionals develop communication, team management, and emotional intelligence skills.",
    price: "18.00",
    category: "New Arrivals",
    genre: "Business",
    img: "/images/business11.jpg",
    description:
      "Develop essential leadership qualities such as communication, emotional intelligence, and team management in modern workplaces.",
  },
  {
    id: 12,
    title: "Negotiation Tactics",
    author: "Laura White",
    authorBio: "Laura White is an expert negotiator and business consultant who has trained executives in successful negotiation strategies and conflict resolution.",
    price: "17.50",
    category: "New Arrivals",
    genre: "Business",
    img: "/images/business12.jpg",
    description:
      "Master negotiation techniques used in business deals, conflict resolution, and professional communication.",
  },
  {
    id: 13,
    title: "Financial Accounting Basics",
    author: "Mark Green",
    authorBio: "Mark Green is an accounting professional and educator with extensive experience teaching financial reporting, accounting principles, and corporate finance.",
    price: "19.00",
    category: "New Arrivals",
    genre: "Business",
    img: "/images/business13.jpg",
    description:
      "A beginner-friendly guide to accounting principles, financial statements, and business financial analysis.",
  },
  {
    id: 14,
    title: "Digital Marketing Guide",
    author: "Sophia Brown",
    authorBio: "Sophia Brown is a digital marketing specialist focusing on SEO, social media, and online brand strategy. She has consulted for several multinational companies.",
    price: "20.00",
    category: "Recommended",
    genre: "Business",
    img: "/images/business14.jpg",
    description:
      "Explore SEO, social media marketing, content strategy, and online branding techniques for the digital age.",
  },
  {
    id: 15,
    title: "Corporate Strategy Explained",
    author: "James White",
    authorBio: "James White is a corporate strategist and advisor who helps companies plan long-term growth and navigate competitive markets effectively.",
    price: "21.50",
    category: "Recommended",
    genre: "Business",
    img: "/images/business15.jpg",
    description:
      "Understand how corporations plan growth, compete globally, and adapt strategies in changing economic environments.",
  },
  // ------------------- ISLAMIC -------------------
  {
    id: 16,
    title: "Introduction to Islam",
    author: "Dr. Ahmed",
    authorBio: "Dr. Ahmed is an Islamic scholar with over 20 years of teaching experience. He focuses on making foundational Islamic knowledge accessible to beginners.",
    price: "12.99",
    category: "Featured",
    genre: "Islamic",
    img: "/images/islamic1.jpg",
    description:
      "A comprehensive introduction to Islamic beliefs, practices, and values, suitable for beginners and curious readers.",
  },
  {
    id: 17,
    title: "Islamic History for Beginners",
    author: "Ali Khan",
    authorBio: "Ali Khan is a historian specializing in early Islamic civilizations. He simplifies complex historical narratives for students and general readers.",
    price: "15.50",
    category: "Featured",
    genre: "Islamic",
    img: "/images/islamic2.jpg",
    description:
      "An accessible overview of Islamic history from the Prophet’s era to early Islamic civilizations.",
  },
  {
    id: 18,
    title: "Advanced Islamic Thought",
    author: "Dr. Karim",
    authorBio: "Dr. Karim is a theologian and researcher in Islamic philosophy, exploring intellectual traditions and scholarly discourse across history.",
    price: "14.20",
    category: "Category",
    genre: "Islamic",
    img: "/images/islamic3.jpg",
    description:
      "A scholarly exploration of Islamic philosophy, theology, and intellectual traditions across centuries.",
  },
  {
    id: 19,
    title: "Quranic Studies",
    author: "Fatima Noor",
    authorBio: "Fatima Noor is an Islamic studies scholar focusing on Qur’anic interpretation and exegesis. She has published research on thematic and linguistic analyses of the Qur’an.",
    price: "16.50",
    category: "Category",
    genre: "Islamic",
    img: "/images/islamic4.jpg",
    description:
      "An analytical approach to understanding the Qur’an, its themes, linguistic beauty, and historical context.",
  },
  {
    id: 20,
    title: "Hadith Compilation",
    author: "Dr. Samir",
    authorBio: "Dr. Samir is an expert in Hadith sciences and Islamic jurisprudence. He has taught at several universities and authored books on prophetic traditions.",
    price: "15.00",
    category: "Category",
    genre: "Islamic",
    img: "/images/islamic5.jpg",
    description:
      "A curated collection of authentic Hadith with explanations to understand prophetic teachings.",
  },
  {
    id: 21,
    title: "Islamic History Deep Dive",
    author: "Ali Rehman",
    authorBio: "Ali Rehman is a historian and author who explores the social, political, and cultural evolution of Islamic civilizations over centuries.",
    price: "17.00",
    category: "Category",
    genre: "Islamic",
    img: "/images/islamic6.jpg",
    description:
      "A detailed examination of major events, empires, and personalities that shaped Islamic history.",
  },
  {
    id: 22,
    title: "Modern Islamic Philosophy",
    author: "Dr. Ahmed",
    authorBio: "Dr. Ahmed is a contemporary Islamic philosopher focusing on ethical, social, and intellectual issues in modern Muslim societies.",
    price: "21.50",
    category: "Popular",
    genre: "Islamic",
    img: "/images/islamic7.jpg",
    description:
      "Discusses contemporary Islamic philosophical thought and its interaction with modern challenges.",
  },
  {
    id: 23,
    title: "Hadith Explained",
    author: "Fatima Noor",
    authorBio: "Fatima Noor is a scholar specializing in Hadith interpretation and practical application. She emphasizes understanding context and meaning.",
    price: "19.99",
    category: "Popular",
    genre: "Islamic",
    img: "/images/islamic8.jpg",
    description:
      "Clear explanations of selected Hadith to help readers understand their meanings and applications.",
  },
  {
    id: 24,
    title: "Seerah of the Prophet",
    author: "Ali Khan",
    authorBio: "Ali Khan is a historian and Islamic scholar who focuses on the life of Prophet Muhammad ﷺ, extracting lessons on leadership and character.",
    price: "18.50",
    category: "Popular",
    genre: "Islamic",
    img: "/images/islamic9.jpg",
    description:
      "A detailed account of the life of Prophet Muhammad ﷺ, highlighting lessons in character and leadership.",
  },
  {
    id: 25,
    title: "Islamic Law & Society",
    author: "Dr. Karim",
    authorBio: "Dr. Karim is an Islamic jurist and researcher who studies Sharia law and its application in contemporary social contexts.",
    price: "20.00",
    category: "Popular",
    genre: "Islamic",
    img: "/images/islamic10.jpg",
    description:
      "Explores the principles of Islamic law and its role in shaping ethical and social systems.",
  },
  {
    id: 26,
    title: "Fiqh Essentials",
    author: "Dr. Samir",
    authorBio: "Dr. Samir is an Islamic scholar with expertise in Fiqh (jurisprudence). He teaches practical religious rulings and everyday applications of Sharia.",
    price: "16.50",
    category: "New Arrivals",
    genre: "Islamic",
    img: "/images/islamic11.jpg",
    description:
      "A practical guide to understanding Islamic jurisprudence and everyday religious rulings.",
  },
  {
    id: 27,
    title: "Islamic Ethics",
    author: "Fatima Noor",
    authorBio: "Fatima Noor researches moral and ethical principles in Islam, focusing on character development and practical applications for daily life.",
    price: "15.50",
    category: "New Arrivals",
    genre: "Islamic",
    img: "/images/islamic12.jpg",
    description:
      "Focuses on moral values, character development, and ethical principles in Islam.",
  },
  {
    id: 28,
    title: "Tafsir of Quran",
    author: "Dr. Ahmed",
    authorBio: "Dr. Ahmed specializes in Qur’anic exegesis, providing context, interpretation, and thematic analysis of the verses for learners and scholars alike.",
    price: "18.00",
    category: "New Arrivals",
    genre: "Islamic",
    img: "/images/islamic13.jpg",
    description:
      "An interpretative study of the Qur’an, explaining verses with historical and thematic insights.",
  },
  {
    id: 29,
    title: "Islamic Civilization",
    author: "Ali Rehman",
    authorBio: "Ali Rehman is a historian and author who documents the rise and contributions of Islamic civilizations in science, culture, and society.",
    price: "19.50",
    category: "Recommended",
    genre: "Islamic",
    img: "/images/islamic14.jpg",
    description:
      "Covers the rise of Islamic civilization and its contributions to science, culture, and society.",
  },
  {
    id: 30,
    title: "Prophetic Guidance",
    author: "Dr. Karim",
    authorBio: "Dr. Karim is an Islamic scholar focusing on the life and teachings of the Prophet ﷺ, providing practical guidance for modern contexts.",
    price: "20.00",
    category: "Recommended",
    genre: "Islamic",
    img: "/images/islamic15.jpg",
    description:
      "Explores timeless guidance from the Prophet ﷺ and its relevance in modern life.",
  },
];
export default books;