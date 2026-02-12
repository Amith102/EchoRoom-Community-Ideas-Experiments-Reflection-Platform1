import { Users } from "lucide-react";
import { PageLayout } from "./PageLayout";
const CommunityPage = () => {
  return (
    <PageLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">EchoRoom Community</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-4">
            The EchoRoom community is where learners, builders, and thinkers
            come together to explore ideas, run experiments, and reflect on
            their learning journey.
          </p>

          <p className="text-lg text-muted-foreground mb-4">
            This space will enable collaboration, discussions, and shared
            learning experiences. Members will be able to contribute ideas,
            participate in experiments, and grow together as a community.
          </p>

          <p className="text-lg text-muted-foreground mb-8">
            Future updates will include community discussions, contributor
            profiles, and collaborative tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Members", value: "120+", icon: "👥" },
              { label: "Ideas Shared", value: "45", icon: "💡" },
              { label: "Experiments Run", value: "12", icon: "🧪" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CommunityPage;
