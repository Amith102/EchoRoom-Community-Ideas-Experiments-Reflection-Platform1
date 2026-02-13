import { Router, Request, Response } from "express";

const router = Router();
// helper: validate non-empty string
function isValidString(value: any): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// helper: validate IdeaStatus
function isValidStatus(status: any): status is IdeaStatus {
  return ["proposed", "experiment", "outcome", "reflection"].includes(status);
}


// Allowed lifecycle states
type IdeaStatus = "proposed" | "experiment" | "outcome" | "reflection";


// Temporary in-memory storage
interface Idea {
  id: number;
  title: string;
  description: string;
  status: IdeaStatus;

}

export let ideas: Idea[] = [];

export let nextIdeaId = 1;
// Define valid state transitions
const allowedTransitions: Record<IdeaStatus, IdeaStatus[]> = {
  proposed: ["experiment"],
  experiment: ["outcome"],
  outcome: ["reflection"],
  reflection: [],
};


// GET /ideas
router.get("/", (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      ideas: ideas,
    });
  } catch (error) {
  console.error("Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

});

// POST /ideas
router.post("/", (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

// validate title
if (!isValidString(title)) {
  return res.status(400).json({
    success: false,
    message: "Valid title is required",
  });
}

if (!isValidString(description)) {
  return res.status(400).json({
    success: false,
    message: "Valid description is required",
  });
}


    const newIdea: Idea = {
      id: nextIdeaId++,
      title,
      description,
      status: "proposed",
    };

    ideas.push(newIdea);

    res.status(201).json({
      success: true,
      idea: newIdea,
    });
  } catch (error) {
  console.error("Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

});
// PATCH /ideas/:id/status
router.patch("/:id/status", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // NEW: validate ID format
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid idea ID",
      });
    }

const { status } = req.body;

// validate status exists
if (!status) {
  return res.status(400).json({
    success: false,
    message: "Status is required",
  });
}

// validate status value
if (!isValidStatus(status)) {
  return res.status(400).json({
    success: false,
    message: "Invalid status value",
  });
}

    const idea = ideas.find(i => i.id === id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    const allowed = allowedTransitions[idea.status];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid transition from '${idea.status}' to '${status}'`,
      });
    }

    idea.status = status;

    res.json({
      success: true,
      idea,
    });

  } catch (error) {
  console.error("Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

});



export default router;
