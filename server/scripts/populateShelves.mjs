const BASE = "http://localhost:4000/api";

const newBooks = [
  // Fantasy
  { title: "A Game of Thrones", author: "George R.R. Martin", category: "Fantasy", price: 16.99, stock: 6, libraryCopies: 3 },
  { title: "The Way of Kings", author: "Brandon Sanderson", category: "Fantasy", price: 17.5, stock: 5, libraryCopies: 2 },
  { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", category: "Fantasy", price: 14.99, stock: 6, libraryCopies: 3 },
  { title: "The Lies of Locke Lamora", author: "Scott Lynch", category: "Fantasy", price: 13.5, stock: 4, libraryCopies: 2 },
  { title: "The Eye of the World", author: "Robert Jordan", category: "Fantasy", price: 15.0, stock: 5, libraryCopies: 2 },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", price: 12.99, stock: 10, libraryCopies: 4 },
  { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", category: "Fantasy", price: 9.99, stock: 8, libraryCopies: 3 },
  { title: "Eragon", author: "Christopher Paolini", category: "Fantasy", price: 11.5, stock: 6, libraryCopies: 2 },

  // Science Fiction
  { title: "Foundation", author: "Isaac Asimov", category: "Science Fiction", price: 13.99, stock: 6, libraryCopies: 3 },
  { title: "Ender's Game", author: "Orson Scott Card", category: "Science Fiction", price: 12.5, stock: 7, libraryCopies: 3 },
  { title: "Snow Crash", author: "Neal Stephenson", category: "Science Fiction", price: 14.0, stock: 4, libraryCopies: 2 },
  { title: "Neuromancer", author: "William Gibson", category: "Science Fiction", price: 13.25, stock: 5, libraryCopies: 2 },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", category: "Science Fiction", price: 12.0, stock: 4, libraryCopies: 2 },
  { title: "Hyperion", author: "Dan Simmons", category: "Science Fiction", price: 14.5, stock: 4, libraryCopies: 2 },
  { title: "Ready Player One", author: "Ernest Cline", category: "Science Fiction", price: 13.0, stock: 8, libraryCopies: 3 },

  // Classic
  { title: "Moby-Dick", author: "Herman Melville", category: "Classic", price: 11.99, stock: 5, libraryCopies: 2 },
  { title: "War and Peace", author: "Leo Tolstoy", category: "Classic", price: 15.99, stock: 4, libraryCopies: 2 },
  { title: "Jane Eyre", author: "Charlotte Bronte", category: "Classic", price: 10.5, stock: 6, libraryCopies: 3 },
  { title: "Wuthering Heights", author: "Emily Bronte", category: "Classic", price: 9.99, stock: 5, libraryCopies: 2 },
  { title: "Great Expectations", author: "Charles Dickens", category: "Classic", price: 10.75, stock: 5, libraryCopies: 2 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", price: 9.5, stock: 9, libraryCopies: 4 },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Classic", price: 12.25, stock: 4, libraryCopies: 2 },
  { title: "Don Quixote", author: "Miguel de Cervantes", category: "Classic", price: 13.0, stock: 4, libraryCopies: 2 },

  // Dystopian
  { title: "The Handmaid's Tale", author: "Margaret Atwood", category: "Dystopian", price: 12.99, stock: 7, libraryCopies: 3 },
  { title: "Animal Farm", author: "George Orwell", category: "Dystopian", price: 8.99, stock: 9, libraryCopies: 4 },
  { title: "We", author: "Yevgeny Zamyatin", category: "Dystopian", price: 11.0, stock: 3, libraryCopies: 1 },
  { title: "The Hunger Games", author: "Suzanne Collins", category: "Dystopian", price: 11.5, stock: 10, libraryCopies: 4 },
  { title: "A Clockwork Orange", author: "Anthony Burgess", category: "Dystopian", price: 11.25, stock: 4, libraryCopies: 2 },
  { title: "The Giver", author: "Lois Lowry", category: "Dystopian", price: 8.5, stock: 6, libraryCopies: 3 },
  { title: "Never Let Me Go", author: "Kazuo Ishiguro", category: "Dystopian", price: 12.0, stock: 5, libraryCopies: 2 },
  { title: "Station Eleven", author: "Emily St. John Mandel", category: "Dystopian", price: 13.5, stock: 5, libraryCopies: 2 },
  { title: "Parable of the Sower", author: "Octavia Butler", category: "Dystopian", price: 12.75, stock: 4, libraryCopies: 2 },

  // Thriller
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", category: "Thriller", price: 13.99, stock: 6, libraryCopies: 3 },
  { title: "The Silence of the Lambs", author: "Thomas Harris", category: "Thriller", price: 11.99, stock: 5, libraryCopies: 2 },
  { title: "The Da Vinci Code", author: "Dan Brown", category: "Thriller", price: 12.5, stock: 9, libraryCopies: 4 },
  { title: "The Girl on the Train", author: "Paula Hawkins", category: "Thriller", price: 11.25, stock: 6, libraryCopies: 3 },
  { title: "In the Woods", author: "Tana French", category: "Thriller", price: 12.0, stock: 4, libraryCopies: 2 },
  { title: "The Bourne Identity", author: "Robert Ludlum", category: "Thriller", price: 10.99, stock: 5, libraryCopies: 2 },
  { title: "Big Little Lies", author: "Liane Moriarty", category: "Thriller", price: 12.25, stock: 6, libraryCopies: 3 },
  { title: "Sharp Objects", author: "Gillian Flynn", category: "Thriller", price: 11.5, stock: 5, libraryCopies: 2 },
  { title: "The Talented Mr. Ripley", author: "Patricia Highsmith", category: "Thriller", price: 10.75, stock: 4, libraryCopies: 2 },

  // Non-Fiction
  { title: "Educated", author: "Tara Westover", category: "Non-Fiction", price: 14.99, stock: 7, libraryCopies: 3 },
  { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", category: "Non-Fiction", price: 13.5, stock: 4, libraryCopies: 2 },
  { title: "Into the Wild", author: "Jon Krakauer", category: "Non-Fiction", price: 11.99, stock: 6, libraryCopies: 3 },
  { title: "A Short History of Nearly Everything", author: "Bill Bryson", category: "Non-Fiction", price: 15.0, stock: 6, libraryCopies: 3 },
  { title: "The Devil in the White City", author: "Erik Larson", category: "Non-Fiction", price: 13.25, stock: 4, libraryCopies: 2 },
  { title: "Outliers", author: "Malcolm Gladwell", category: "Non-Fiction", price: 12.99, stock: 8, libraryCopies: 3 },
  { title: "Quiet", author: "Susan Cain", category: "Non-Fiction", price: 12.5, stock: 5, libraryCopies: 2 },
  { title: "Born a Crime", author: "Trevor Noah", category: "Non-Fiction", price: 13.0, stock: 7, libraryCopies: 3 },
  { title: "The Sixth Extinction", author: "Elizabeth Kolbert", category: "Non-Fiction", price: 14.25, stock: 4, libraryCopies: 2 },

  // Banned
  { title: "The Color Purple", author: "Alice Walker", category: "Banned", price: 12.0, stock: 5, libraryCopies: 2 },
  { title: "The Perks of Being a Wallflower", author: "Stephen Chbosky", category: "Banned", price: 10.99, stock: 6, libraryCopies: 3 },

  // Staff Picks (fictional, no real cover available)
  { title: "The Pagebound Cookbook", author: "Pagebound Books Team", category: "Staff Picks", price: 16.0, stock: 5, libraryCopies: 2 },
  { title: "Shelved: A Field Guide to Our Favorite Genres", author: "Pagebound Books Team", category: "Staff Picks", price: 11.0, stock: 6, libraryCopies: 3 },
  { title: "The Late Return", author: "Pagebound Books Team", category: "Staff Picks", price: 10.5, stock: 4, libraryCopies: 2 },
  { title: "Margin Notes: Readers Write Back", author: "Pagebound Books Team", category: "Staff Picks", price: 9.99, stock: 5, libraryCopies: 2 },
  { title: "Opening Hours", author: "Pagebound Books Team", category: "Staff Picks", price: 12.25, stock: 4, libraryCopies: 2 },
  { title: "The Indie Bookstore Survival Guide", author: "Pagebound Books Team", category: "Staff Picks", price: 13.5, stock: 5, libraryCopies: 2 },
];

const created = [];
for (const book of newBooks) {
  const res = await fetch(`${BASE}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...book, coverUrl: "", description: `${book.title} by ${book.author}.` }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("FAILED", book.title, data);
    continue;
  }
  created.push(data);
}

console.log(JSON.stringify(created.map((b) => ({ id: b.id, title: b.title, author: b.author, category: b.category }))));
