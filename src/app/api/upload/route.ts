import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
        return NextResponse.json(
            { error: "No file provided" },
            { status: 400 }
        );
        }

        if (file.type !== "application/pdf") {
        return NextResponse.json(
            { error: "Only PDF files are allowed" },
            { status: 400 }
        );
        }

        const maxSize = 10 * 1024 * 1024; 
        if (file.size > maxSize) {
        return NextResponse.json(
            { error: "File size must be less than 10MB" },
            { status: 400 }
        );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "evidences");
        if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = `evidence_${timestamp}_${randomString}.pdf`;
        const filePath = path.join(uploadsDir, fileName);

        await writeFile(filePath, buffer);

        const fileUrl = `/uploads/evidences/${fileName}`;

        return NextResponse.json({
        success: true,
        fileName: file.name,
        fileUrl,
        fileSize: file.size,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
        {
            error: "Failed to upload file",
            details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
        );
    }
}