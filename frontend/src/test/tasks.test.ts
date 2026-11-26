import { describe, expect, it } from "vitest";
import {
  filterTasks,
  initialTasks,
  isTaskStatus,
  updateTask,
  validateDescription,
  validateTitle,
} from "@/lib/tasks";

describe("Study task rules", () => {
  it("rejects empty or whitespace-only titles", () => {
    expect(() => validateTitle("")).toThrow();
    expect(() => validateTitle("   ")).toThrow();
  });

  it("accepts and trims a title", () => {
    expect(validateTitle("  Estudar JavaScript  ")).toBe("Estudar JavaScript");
  });

  it("rejects empty or whitespace-only descriptions", () => {
    expect(() => validateDescription("")).toThrow();
    expect(() => validateDescription("   ")).toThrow();
  });

  it("accepts and trims a description", () => {
    expect(validateDescription("  Revisar funções  ")).toBe("Revisar funções");
  });

  it("filters tasks by each status", () => {
    expect(filterTasks(initialTasks, "all")).toHaveLength(3);
    expect(filterTasks(initialTasks, "pending").map((task) => task.id)).toEqual(["2"]);
    expect(filterTasks(initialTasks, "in-progress").map((task) => task.id)).toEqual(["1"]);
    expect(filterTasks(initialTasks, "completed").map((task) => task.id)).toEqual(["3"]);
  });

  it("does not alter the original tasks while filtering", () => {
    const tasks = structuredClone(initialTasks);
    filterTasks(tasks, "in-progress");
    expect(tasks).toEqual(initialTasks);
  });

  it("moves a task between all statuses and keeps the legacy completed flag in sync", () => {
    const started = updateTask(initialTasks, "2", { status: "in-progress" });
    expect(started[1]).toMatchObject({ status: "in-progress", completed: false });

    const completed = updateTask(started, "2", { status: "completed" });
    expect(completed[1]).toMatchObject({ status: "completed", completed: true });

    const undone = updateTask(completed, "2", { status: "pending" });
    expect(undone[1]).toMatchObject({ status: "pending", completed: false });
    expect(initialTasks[1]).toMatchObject({ status: "pending", completed: false });
  });

  it("updates title and description without changing status", () => {
    const result = updateTask(initialTasks, "1", {
      title: "Revisar funções",
      description: "Resolver exercícios práticos.",
    });
    expect(result[0]).toMatchObject({
      title: "Revisar funções",
      description: "Resolver exercícios práticos.",
      status: "in-progress",
    });
    expect(initialTasks[0]?.title).toBe("Estudar JavaScript");
  });

  it("maps legacy completion updates to the matching status", () => {
    expect(updateTask(initialTasks, "1", { completed: true })[0]).toMatchObject({
      status: "completed",
      completed: true,
    });
    expect(updateTask(initialTasks, "3", { completed: false })[2]).toMatchObject({
      status: "pending",
      completed: false,
    });
  });

  it("only accepts supported task statuses", () => {
    expect(isTaskStatus("in-progress")).toBe(true);
    expect(isTaskStatus("started")).toBe(false);
  });
});
