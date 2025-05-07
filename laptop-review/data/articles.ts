import { Article } from '@/types/article';

export const articles: Article[] = [
  {
    id: "1",
    title: "The Future of Laptop Design: Foldable Screens and AI Integration",
    image: "/placeholder.svg",
    excerpt: "As technology continues to advance, laptop designs are evolving beyond traditional form factors. Foldable screens and AI-powered features are creating new possibilities for how we work and interact with our devices.",
    content: `
      <p class="mb-4">As technology continues to advance at an unprecedented rate, laptop designs are evolving beyond the traditional clamshell form factors that have dominated the market for decades. Two major innovations are leading this transformation: foldable screens and deep AI integration.</p>

      <h2 class="text-2xl font-bold mt-8 mb-3">The Foldable Revolution</h2>
      <p class="mb-4">Foldable laptops represent a significant departure from conventional design. These devices feature flexible OLED displays that can bend or fold, enabling new form factors and use cases. Companies like Lenovo, ASUS, and Samsung have already begun releasing devices with foldable screens, offering users the ability to transform their laptops into tablets or even dual-screen workstations.</p>
      <p class="mb-4">The advantages of foldable screens are numerous. They provide larger display areas without increasing the overall footprint of the device when folded. This makes them ideal for professionals who need maximum screen real estate for multitasking but still require portability.</p>

      <h2 class="text-2xl font-bold mt-8 mb-3">AI Beyond Assistant Features</h2>
      <p class="mb-4">Artificial intelligence has moved far beyond simple virtual assistants. Modern laptops now incorporate AI at the hardware level, with dedicated neural processing units (NPUs) becoming standard in premium devices.</p>
      <p class="mb-4">These AI capabilities enable features like real-time translation, advanced photo and video editing that can identify and manipulate specific elements within media, and predictive performance optimization that learns from user behavior to allocate system resources more efficiently.</p>
      <p class="mb-4">Perhaps most impressively, AI is now powering adaptive user interfaces that can reorganize themselves based on usage patterns, highlighting frequently used features and hiding those that are rarely accessed.</p>

      <h2 class="text-2xl font-bold mt-8 mb-3">Challenges and Concerns</h2>
      <p class="mb-4">Despite the exciting possibilities, these innovations come with challenges. Foldable screens still face durability concerns, particularly around the folding mechanism and crease visibility. They also command significant price premiums over traditional laptops.</p>
      <p class="mb-4">Meanwhile, the deep integration of AI raises questions about privacy and security. With devices constantly analyzing user behavior and potentially sending data to cloud services for processing, manufacturers must implement robust safeguards to protect user information.</p>

      <h2 class="text-2xl font-bold mt-8 mb-3">Looking Ahead</h2>
      <p class="mb-4">As these technologies mature, we can expect costs to decrease and reliability to improve. The combination of flexible displays and AI could lead to entirely new computing paradigms, where the distinction between different device categories continues to blur.</p>
      <p class="mb-4">For consumers and businesses planning their next technology purchases, these innovations offer exciting possibilities but also require careful consideration of practical needs versus cutting-edge features.</p>
    `,
    author: "Tech Editor",
    date: "May 15, 2024",
    readTime: "8 min read",
    category: "tech",
    isFeatured: true,
    categories: ["Technology", "Innovation"]
  },
  {
    id: "2",
    title: "Best Student Laptops for 2024: Budget-Friendly Options",
    image: "/placeholder.svg",
    excerpt: "Find the perfect laptop for your academic needs without breaking the bank.",
    author: "Student Tech Advisor",
    date: "May 10, 2024",
    readTime: "6 min read",
    category: "guides"
  },
  {
    id: "3",
    title: "Gaming Laptop Review: ASUS ROG Zephyrus G14 (2024)",
    image: "/placeholder.svg",
    excerpt: "The latest G14 packs incredible power into a compact chassis. See how it performs in our tests.",
    author: "Gaming Editor",
    date: "May 8, 2024",
    readTime: "12 min read",
    category: "reviews"
  },
  {
    id: "4", 
    title: "Apple's M3 MacBook Pro: Worth the Upgrade?",
    image: "/placeholder.svg",
    excerpt: "We compare the M3 MacBook Pro against its predecessors to help you decide if it's time to upgrade.",
    author: "Apple Expert",
    date: "May 5, 2024",
    readTime: "9 min read",
    category: "reviews"
  },
  {
    id: "5",
    title: "Windows 12: What to Expect for Laptop Users",
    image: "/placeholder.svg",
    excerpt: "The upcoming Windows 12 promises significant changes that will impact how we use our laptops.",
    author: "Software Analyst",
    date: "May 3, 2024",
    readTime: "7 min read",
    category: "tech"
  },
  {
    id: "6",
    title: "How to Choose the Right Laptop for Video Editing",
    image: "/placeholder.svg",
    excerpt: "From CPU to GPU to screen resolution, we break down what matters for video editors.",
    author: "Creative Pro",
    date: "April 28, 2024",
    readTime: "10 min read",
    category: "guides"
  },
  {
    id: "7",
    title: "The Rise of ARM-based Laptops: Industry Shift",
    image: "/placeholder.svg",
    excerpt: "ARM architecture is changing the laptop landscape. What does it mean for consumers?",
    author: "Tech Analyst",
    date: "April 25, 2024",
    readTime: "8 min read",
    category: "trends"
  },
  {
    id: "8",
    title: "Laptop Battery Life Breakthrough: 24+ Hour Laptops",
    image: "/placeholder.svg",
    excerpt: "New battery technology promises all-day laptop use without recharging.",
    author: "Tech Researcher",
    date: "April 20, 2024",
    readTime: "7 min read",
    category: "tech",
    views: "5.2K",
    isTrending: true
  },
  {
    id: "9",
    title: "Comparison: Dell XPS 13 vs MacBook Air M3",
    image: "/placeholder.svg",
    excerpt: "We put the two most popular ultrabooks head-to-head in our comprehensive comparison.",
    author: "Hardware Reviewer",
    date: "April 15, 2024",
    readTime: "11 min read",
    category: "reviews",
    views: "4.8K",
    isTrending: true
  },
  {
    id: "10",
    title: "Budget Gaming Laptops Under $800 That Actually Perform",
    image: "/placeholder.svg",
    excerpt: "These affordable gaming machines offer impressive performance without breaking the bank.",
    author: "Budget Tech Guru",
    date: "April 10, 2024",
    readTime: "9 min read",
    category: "guides",
    views: "3.7K",
    isTrending: true
  },
  {
    id: "11",
    title: "Best Laptop Cooling Pads for Summer Gaming",
    image: "/placeholder.svg",
    excerpt: "Keep your gaming laptop cool during intense summer gaming sessions with these top cooling solutions.",
    author: "Gaming Hardware Expert",
    date: "April 5, 2024",
    readTime: "6 min read",
    category: "guides",
    views: "2.9K",
    isTrending: true
  }
];

export const getFeaturedArticle = (): Article | undefined => {
  return articles.find(article => article.isFeatured);
};

export const getTrendingArticles = (): Article[] => {
  return articles.filter(article => article.isTrending);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return category === "all" 
    ? articles.filter(article => !article.isFeatured) 
    : articles.filter(article => article.category === category && !article.isFeatured);
};

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
}; 