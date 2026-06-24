import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBook, updateBook } from "../../api/client";
import AdminTabs from "../../components/AdminTabs";

const emptyForm = {
  title: "",
  author: "",
  price: "",
  coverUrl: "",
  description: "",
  category: "",
  stock: "",
  libraryCopies: "",
};

export default function AdminBookFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getBook(id)
      .then((book) =>
        setForm({
          title: book.title,
          author: book.author,
          price: String(book.price),
          coverUrl: book.coverUrl,
          description: book.description,
          category: book.category,
          stock: String(book.stock),
          libraryCopies: String(book.libraryCopies || 0),
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const payload = {
      title: form.title,
      author: form.author,
      price: parseFloat(form.price),
      coverUrl: form.coverUrl,
      description: form.description,
      category: form.category,
      stock: parseInt(form.stock, 10),
      libraryCopies: parseInt(form.libraryCopies, 10) || 0,
    };
    try {
      if (isEdit) {
        await updateBook(id, payload);
      } else {
        await createBook(payload);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminTabs />
      <h1>{isEdit ? "Edit Book" : "Add Book"}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Title
          <input required value={form.title} onChange={handleChange("title")} />
        </label>
        <label>
          Author
          <input required value={form.author} onChange={handleChange("author")} />
        </label>
        <label>
          Price
          <input type="number" min="0" step="0.01" required value={form.price} onChange={handleChange("price")} />
        </label>
        <label>
          Stock (for sale)
          <input type="number" min="0" step="1" required value={form.stock} onChange={handleChange("stock")} />
        </label>
        <label>
          Library Copies (for borrowing)
          <input
            type="number"
            min="0"
            step="1"
            required
            value={form.libraryCopies}
            onChange={handleChange("libraryCopies")}
          />
        </label>
        <label>
          Category
          <input value={form.category} onChange={handleChange("category")} />
        </label>
        <label>
          Cover Image URL
          <input value={form.coverUrl} onChange={handleChange("coverUrl")} />
        </label>
        <label>
          Description
          <textarea value={form.description} onChange={handleChange("description")} />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="primary-button">
          {isEdit ? "Save Changes" : "Create Book"}
        </button>
      </form>
    </div>
  );
}
