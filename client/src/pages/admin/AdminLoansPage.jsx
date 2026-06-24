import { useEffect, useState } from "react";
import { getLoans, returnLoan } from "../../api/client";
import AdminTabs from "../../components/AdminTabs";

export default function AdminLoansPage() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  const load = () => {
    getLoans().then(setLoans).catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleReturn = async (id) => {
    try {
      await returnLoan(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const isOverdue = (loan) => !loan.returnedAt && new Date(loan.dueAt) < new Date();

  return (
    <div>
      <AdminTabs />
      <div className="admin-header">
        <h1>Manage Loans</h1>
      </div>
      {error && <p className="error-text">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Borrower</th>
            <th>Borrowed</th>
            <th>Due</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.title}</td>
              <td>
                {loan.borrower.name}
                <br />
                <span className="loan-email">{loan.borrower.email}</span>
              </td>
              <td>{new Date(loan.borrowedAt).toLocaleDateString()}</td>
              <td>{new Date(loan.dueAt).toLocaleDateString()}</td>
              <td>
                {loan.returnedAt ? (
                  <span className="success-text">Returned</span>
                ) : isOverdue(loan) ? (
                  <span className="error-text">Overdue</span>
                ) : (
                  <span>Active</span>
                )}
              </td>
              <td>
                {!loan.returnedAt && (
                  <button onClick={() => handleReturn(loan.id)}>Mark Returned</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
