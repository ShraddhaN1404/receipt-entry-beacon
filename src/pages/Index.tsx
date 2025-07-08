import { HeroSection } from "@/components/HeroSection";
import { ReceiptForm } from "@/components/ReceiptForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <HeroSection />
        <div className="max-w-md mx-auto">
          <ReceiptForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
