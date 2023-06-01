import {
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './resourse/order/order.service';
import { EmergencyOrderDto } from './resourse/order/order.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './guard/role.guard';
import { UserAccessGuard } from './guard/auth.guard';
import { LawyerStatus, ServiceStatus, UserType } from './utils/enum';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(private readonly orderService: OrderService) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');
  private lawyers = [];
  @SubscribeMessage('create_emergency_order')
  async handleCreateEmergencyOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: EmergencyOrderDto,
  ): Promise<void> {
    let order = await this.orderService.createEmergencyOrder(payload);
    console.log(order.serviceStatus);
    this.server.emit('response_emergency_order', order.serviceStatus);
  }
  @SubscribeMessage('change_order_status')
  async updateStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      id: string;
      status: LawyerStatus;
      orderId: string;
      orderStatus: ServiceStatus;
    },
  ): Promise<void> {
    let status = await this.orderService.updateLawyerStatus(
      payload.id,
      payload.status,
      payload.orderId,
      payload.orderStatus,
    );
    this.server.emit('response_emergency_order', status);
  }

  @SubscribeMessage('join_room')
  async joinRoomOurLawyer(@ConnectedSocket() client: Socket): Promise<void> {
    this.lawyers.push(client.id);
    await this.server.emit('onlineEmergency', this.lawyers);
  }

  afterInit(server: Server) {
    this.logger.log(server);

    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.lawyers.splice(this.lawyers.indexOf(client.id), 1);
    //Do stuffs
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    //Do stuffs
  }
}
