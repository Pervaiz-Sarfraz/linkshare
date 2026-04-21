import Loader from '../comp/Loader';

function Company() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMessage } = useMessage();

  useEffect(() => {
    fetchCompanies()
      .then((res) => { setCompanies(res.data); setLoading(false); })
      .catch((err) => { console.error("Error fetching companies", err); setLoading(false); });
  }, []);

  const handleDelete = async (companyId) => {
    try {
      await deletecompany(companyId);
      setCompanies((prev) => prev.filter((c) => c.company_id !== companyId));
      setMessage("Company removed successfully");
    } catch (err) {
      setMessage("Error deleting company");
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <motion.div
        className="page-header"
        style={{ padding: '3rem 2rem 1rem', maxWidth: '1300px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ 
            width: '48px', height: '48px', 
            background: 'var(--brand-glow)', 
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <FiGrid style={{ color: 'var(--brand)', fontSize: '1.5rem' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Companies</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              Explore {companies.length} leading organizations hiring now
            </p>
          </div>
        </div>
      </motion.div>

      {companies.length === 0 ? (
        <motion.div
          className="no-jobs"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '6rem 2rem', textAlign: 'center' }}
        >
          <div className="no-jobs-icon" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏢</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>No companies registered</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Be the first to register a company and start posting opportunities!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="job-list"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <AnimatePresence mode="popLayout">
            {companies.map((company, index) => (
              <CompanyDetail
                key={company.company_id || `company-${index}`}
                company={company}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default Company;