import { Request, Response } from "express";
import Todo from "../models/todo.model";

const createTodo = async (req: Request, res: Response) => {
    console.log("createTodo", req.body);
    try {
        if (Buffer.isBuffer(req.body)) {
            console.log("Buffer");
            req.body = JSON.parse(req.body.toString("utf-8"));
            console.log("req.body", req.body);
        } else if (typeof req.body === "string") {
            console.log("String");
            req.body = JSON.parse(req.body);
            console.log("req.body", req.body);
        }
        const { title, description } = req.body;
        const todo = await Todo.create({ title, description, completed: false });
        res.status(201).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        if (Buffer.isBuffer(req.body)) {
            console.log("Buffer");
            req.body = JSON.parse(req.body.toString("utf-8"));
            console.log("req.body", req.body);
        } else if (typeof req.body === "string") {
            console.log("String");
            req.body = JSON.parse(req.body);
            console.log("req.body", req.body);
        }
        const { id } = req.params;
        const { title, description, completed } = req.body;
        
        console.log("req.bofdsgfhj", req.body);
        const todo = await Todo.findByIdAndUpdate(
            id,
            req.body, { new: true }
        );

        res.status(200).json({ todo, message: "Todo updated successfully!!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };

