import { TodoDTO } from "@/dto/todo.dto";
import { UserDTO } from "@/dto/user.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TODO 리스트 가져오기
export async function getTodosFromDB(): Promise<TodoDTO[]> {
  try {
    const todos = await prisma.todo.findMany({
      include: {
        user: true, // 각 TODO 항목과 관련된 사용자 정보도 함께 가져옴
      },
    });

    /* 아직 데이터가 없으면 빈 배열을 보냄 */
    if (!todos) {
      return [];
    }

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  } finally {
    await prisma.$disconnect(); // Prisma 클라이언트 연결을 해제합니다.
  }
}

// 특정 User 정보 가져오기
export async function getUserByIdFromDB(
  userId: number
): Promise<UserDTO | null> {
  try {
    // Prisma 클라이언트를 사용해 users 테이블에서 특정 사용자 정보 가져오기
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  } finally {
    await prisma.$disconnect(); // Prisma 클라이언트 연결을 해제합니다.
  }
}
