"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { FileText, Printer, Trash2 } from "lucide-react";

const SavedTrackers = ({
  trackers,
  onLoadTracker,
  onDeleteTracker,
  onPrintTracker,
}) => {
  if (!trackers.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Saved Trackers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No saved trackers yet. Create your first one!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          My Saved Trackers
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>My Saved Trackers</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {trackers.map((tracker) => (
              <Card key={tracker.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {tracker.name || "Untitled Tracker"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Created{" "}
                        {formatDistanceToNow(new Date(tracker.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <p className="text-sm mt-1">
                        {tracker.habits.length} habit
                        {tracker.habits.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPrintTracker(tracker.id)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteTracker(tracker.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="mt-2 p-0 h-auto"
                    onClick={() => onLoadTracker(tracker.id)}
                  >
                    Load Tracker
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SavedTrackers;
