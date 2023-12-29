import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findById(id: string): Promise<CheckIn | null>
    findByUserIdOnDate(user_Id: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(user_Id: string, page:number): Promise<CheckIn[]>
    countByUserId(user_Id: string): Promise<number>
    save(checkIn: CheckIn): Promise<CheckIn>
}