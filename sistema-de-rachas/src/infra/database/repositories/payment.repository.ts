import { CreatePaymentDto } from "../../../domain";
import { Payment } from "../../../domain/entities/payment";


export interface PaymentRepository {
  all(): Promise<Array<Payment>>;
  findById(id: string): Promise<Payment | null>;
  findByUser(userId: string): Promise<Array<Payment | null>>;
  findByMatch(matchId: string): Promise<Payment | null>;
  create(data: CreatePaymentDto): Promise<Payment | null>;
  update(id: string, payload: Partial<CreatePaymentDto>): Promise<Payment | null>;
  delete(id: string): Promise<Payment | null>;
}