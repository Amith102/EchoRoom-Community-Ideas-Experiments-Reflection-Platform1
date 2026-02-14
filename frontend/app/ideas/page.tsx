import { PageLayout } from "../community/PageLayout";

export default function IdeasPage() {
  const ideas: any[] = []; // empty for now

  return (
    <PageLayout>
      <div className="section">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Ideas in EchoRoom
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Ideas are the starting point of learning. Communities can share ideas,
            explore them through experiments, and reflect on outcomes.
          </p>
        </div>

        {/* Content */}
        {ideas.length === 0 ? (

          /* Empty State */
          <div className="card text-center py-12">

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              No ideas yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Ideas shared by the community will appear here.
              Be the first to create one.
            </p>

            <button className="btn-primary">
              Create Idea
            </button>

          </div>

        ) : (

          /* Ideas Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {ideas.map((idea, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Idea Title
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Idea description will appear here.
                </p>

                <div className="text-sm text-gray-400 dark:text-gray-500">
                  Created by Community
                </div>
              </div>
            ))}

          </div>

        )}

      </div>
    </PageLayout>
  );
}
