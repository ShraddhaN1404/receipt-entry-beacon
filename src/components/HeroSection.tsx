import { Shield, Zap, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-center space-y-8 mb-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Receipt Management
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Organize, track, and manage your receipts with ease. 
          Find any transaction instantly with our powerful search.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-foreground">Digital Organization</h3>
          <p className="text-muted-foreground text-center text-sm">
            Store and categorize all your receipts in one secure digital location
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-foreground">Instant Search</h3>
          <p className="text-muted-foreground text-center text-sm">
            Find any receipt in seconds using ID, date, or transaction details
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30">
          <div className="w-12 h-12 bg-primary-glow/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-glow" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-foreground">Secure Storage</h3>
          <p className="text-muted-foreground text-center text-sm">
            Your financial records are protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}