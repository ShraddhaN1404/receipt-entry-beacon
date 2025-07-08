import { useState } from "react";
import { CalendarIcon, Receipt, Search, Upload, X, ImageIcon } from "lucide-react";
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
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    
    if (validImages.length !== files.length) {
      toast({
        title: "Invalid File Type",
        description: "Please upload only image files.",
        variant: "destructive",
      });
    }
    
    if (uploadedImages.length + validImages.length > 5) {
      toast({
        title: "Too Many Images",
        description: "You can upload a maximum of 5 images.",
        variant: "destructive",
      });
      return;
    }
    
    setUploadedImages(prev => [...prev, ...validImages]);
    
    if (validImages.length > 0) {
      toast({
        title: "Images Uploaded",
        description: `${validImages.length} image(s) uploaded successfully.`,
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

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
      title: "Receipt Submitted",
      description: `Receipt ${receiptId} with ${uploadedImages.length} image(s) submitted successfully.`,
    });

    // Here you would typically make an API call to submit the receipt
    console.log("Submitting receipt:", { receiptId, date, images: uploadedImages });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
          <Receipt className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Submit Receipt
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Upload your receipt details and images for processing
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

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Receipt Images
            </Label>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border/60 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-input/20 hover:bg-input/40"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground text-center">
                    Click to upload receipt images<br />
                    <span className="text-xs">(Max 5 images, JPG/PNG)</span>
                  </span>
                </Label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg bg-muted/50 border border-border/30 flex items-center justify-center overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Receipt ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-primary hover:shadow-elegant transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Receipt className="mr-2 h-4 w-4" />
            Submit Receipt
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}