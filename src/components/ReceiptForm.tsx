import { useState } from "react";
import { CalendarIcon, Receipt, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export function ReceiptForm() {
  const [receiptId, setReceiptId] = useState("");
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiptId.trim()) {
      toast({
        title: "Receipt ID Required",
        description: "Please enter a receipt ID to search.",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "Date Required", 
        description: "Please select a date to search.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Search Initiated",
      description: `Searching for receipt ${receiptId} from ${format(date, "PPP")}`,
    });

    // Here you would typically make an API call to search for the receipt
    console.log("Searching for receipt:", { receiptId, date });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
          <Receipt className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Search Receipt
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter receipt details to find your transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="receiptId" className="text-sm font-medium text-foreground">
              Receipt ID
            </Label>
            <Input
              id="receiptId"
              type="text"
              placeholder="Enter receipt ID (e.g., RCP-12345)"
              value={receiptId}
              onChange={(e) => setReceiptId(e.target.value)}
              className="h-11 bg-input/80 border-border/60 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Transaction Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal bg-input/80 border-border/60 hover:bg-input transition-colors",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select transaction date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-primary hover:shadow-elegant transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Receipt
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}