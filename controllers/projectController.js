import supabase from "../config/supabaseClient.js";

/* ================= CREATE PROJECT ================= */

export const createProject = async (req, res) => {
  try {
    // ⭐ user comes from auth middleware (JWT decoded)
    const user = req.user;

    const {
      title,
      description,
      image,
      category,
      goal,
      deadline,
      milestones,
      rewards,
    } = req.body;

    // ⭐ basic validation
    if (!title || !goal) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ⭐ insert project
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          image,
          category,
          goal,
          deadline,
          creator_id: user.id, // 🔥 comes from JWT
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // ⭐ milestones insert (optional)
    if (milestones?.length) {
      const formatted = milestones.map((m) => ({
        project_id: data.id,
        title: m.title,
        amount: m.amount,
      }));

      await supabase.from("milestones").insert(formatted);
    }

    // ⭐ rewards insert (optional)
    if (rewards?.length) {
      const formatted = rewards.map((r) => ({
        project_id: data.id,
        title: r.title,
        amount: r.amount,
        description: r.description,
      }));

      await supabase.from("rewards").insert(formatted);
    }

    res.json({
      message: "Project created successfully 🎉",
      project: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;

    // project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (projectError) throw projectError;
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // rewards
    const { data: rewards, error: rewardsError } = await supabase
      .from("rewards")
      .select("*")
      .eq("project_id", id);

    if (rewardsError) throw rewardsError;

    // milestones
    const { data: milestones, error: milestonesError } = await supabase
      .from("milestones")
      .select("*")
      .eq("project_id", id);

    if (milestonesError) throw milestonesError;

    // updates
    const { data: updates, error: updatesError } = await supabase
      .from("updates")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false });

    if (updatesError) throw updatesError;

    // ✅ ONLY ONE RESPONSE
    return res.json({
      ...project,
      rewards,
      milestones,
      updates,
    });

  } catch (err) {
    console.log("GET PROJECT ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
// ================= FUND PROJECT =================
export const fundProject = async (req, res) => {
  try {
    const { id } = req.params;          // project id from URL
    const { amount } = req.body;        // amount from frontend

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 🔹 get current project from Supabase
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔹 prevent exceeding goal
    const remaining = project.goal - project.raised;
    if (amount > remaining) {
      return res.status(400).json({
        message: `Only ${remaining} needed to reach goal`,
      });
    }

    // 🔹 update raised + backers
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        raised: project.raised + amount,
        backers: (project.backers || 0) + 1,
      })
      .eq("id", id);

    if (updateError) throw updateError;

    res.json({ message: "Funding successful 🎉" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // check project owner
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.creator_id !== userId)
      return res.status(403).json({ message: "Not authorized" });

    await supabase.from("projects").delete().eq("id", id);

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (project.creator_id !== userId)
      return res.status(403).json({ message: "Not authorized" });

    const { data, error } = await supabase
      .from("projects")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

   if (error) {
  console.log("SUPABASE ERROR:", error);
  return res.status(500).json({ message: error.message });
}

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content required" });
    }

    const { data, error } = await supabase
      .from("updates")
      .insert([{ project_id: id, content }])
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Update added", update: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get updates
export const getProjectUpdates = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("updates")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= COMMENTS =================

export const getProjectComments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", req.params.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProjectComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const user = req.user;

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        project_id: id,
        user_id: user.id,
        user_name: user.name,
        content: text,
      },
    ])
    .select()
    .single();

  if (error) return res.status(500).json({ error });

  res.json(data);
};

export const updateProjectComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const { data, error } = await supabase
    .from("comments")
    .update({ content: text })
    .eq("id", commentId)
    .select()
    .maybeSingle();

  if (error) return res.status(500).json({ message: error.message });

  res.json(data);
};

export const deleteProjectComment = async (req, res) => {
  const { commentId } = req.params;

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) return res.status(500).json({ message: error.message });

  res.json({ message: "Deleted" });
};
