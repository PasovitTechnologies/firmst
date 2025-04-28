import { useTranslation } from "react-i18next";
import { FaFileAlt, FaIdCard } from "react-icons/fa";  // Import React Icons

const Documents = () => {
  const { t } = useTranslation();
  const enrollmentDocs = t('requiredDocuments.enrollment', { returnObjects: true });
  const certificateDocs = t('requiredDocuments.certificate', { returnObjects: true });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('requiredDocuments.title')}</h2>

          {/* Enrollment Documents Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">{t('requiredDocuments.enrollmentTitle')}</h3>
              <ul className="space-y-4">
                {enrollmentDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start">
                    <FaFileAlt className="text-blue-900 mt-1 mr-3" /> {/* React Icon */}
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificate Documents Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">{t('requiredDocuments.certificateTitle')}</h3>
              <ul className="space-y-4">
                {certificateDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start">
                    <FaIdCard className="text-blue-900 mt-1 mr-3" /> {/* React Icon */}
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Documents;
