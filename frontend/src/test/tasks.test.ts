import { describe, expect, it } from "vitest";
import { filterTasks, initialTasks, updateTask, validateDescription } from "@/lib/tasks";

describe("Study task rules", () => {
  it("rejects empty descriptions", () => { expect(() => validateDescription("")).toThrow(); });
  it("rejects whitespace-only descriptions", () => { expect(() => validateDescription("   ")).toThrow(); });
  it("accepts and trims a description", () => { expect(validateDescription("  Estudar JavaScript  ")).toBe("Estudar JavaScript"); });
  it("shows every task for Todas", () => { expect(filterTasks(initialTasks, "all")).toHaveLength(4); });
  it("shows only pending tasks", () => { expect(filterTasks(initialTasks, "pending").map((task) => task.id)).toEqual(["1", "2", "3"]); });
  it("shows only completed tasks", () => { expect(filterTasks(initialTasks, "completed").map((task) => task.id)).toEqual(["4"]); });
  it("does not alter the original tasks while filtering", () => { const tasks = structuredClone(initialTasks); filterTasks(tasks, "completed"); expect(tasks).toEqual(initialTasks); });
  it("marks a task as completed", () => { expect(updateTask(initialTasks, "1", { completed: true })[0]?.completed).toBe(true); });
  it("marks a completed task as pending", () => { expect(updateTask(initialTasks, "4", { completed: false })[3]?.completed).toBe(false); });
  it("updates only the edited description", () => { const result = updateTask(initialTasks, "1", { description: "Revisar JavaScript" }); expect(result[0]?.description).toBe("Revisar JavaScript"); expect(result.slice(1)).toEqual(initialTasks.slice(1)); expect(initialTasks[0]?.description).toBe("Estudar JavaScript"); });
});