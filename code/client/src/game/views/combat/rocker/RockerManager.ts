class RockerManager {
	/**摇杆的移动距离 */
	private m_pMoveDistance: number = 90;
	/**拖动的最低触发距离 */
	private m_pMoveMinDistance: number = 170;
	/**角度 */
	private m_pDegrees: number = 0;
	/**控制事件的条件 */
	public m_pNowDirection: number = 100;

	private m_pSaveDegrees: number = 0;

	private m_pErrorNum: number = 3;
	/**左间隙 */
	private leftGap: number = 180;

	private static _instance: RockerManager;

	/**顺时针排序****************** */
	private rightUP1: number = 295;

	private rightUP2: number = 335;

	private rightDown1: number = 25;

	private rightDown2: number = 65;

	private leftDown1: number = 115;

	private leftDown2: number = 155;

	private leftUP1: number = 205;

	private leftUP2: number = 245;
	/***************************** */
	/**RockerManager单例*/
	public static get getInstance(): RockerManager {
		if (!RockerManager._instance) {
			RockerManager._instance = new RockerManager();
		}
		return RockerManager._instance;
	}
	public constructor() {
	}

	/**方向算法 */
	public moveRoker(mouseMovePoint: egret.Point, mouseBeginPoint: egret.Point, image: eui.Image) {
		let valueX = mouseMovePoint.x - mouseBeginPoint.x;
		let valueY = mouseMovePoint.y - mouseBeginPoint.y;

		/**获取玩家信息 */
		// let playr = MapManager.getInstance().getPlayer();
		let m_pDegrees = 0;
		if (valueX == 0 && valueY == 0) {
			return;
		}
		else if (valueX >= 0 && valueY >= 0) {
			m_pDegrees = Math.atan(valueY / valueX) * 180 / Math.PI;
			this.setRokerPoint(valueX, valueY, mouseBeginPoint, image);
		}
		else if (valueX <= 0 && valueY >= 0) {
			m_pDegrees = Math.atan(Math.abs(valueX) / valueY) * 180 / Math.PI + 90;
			this.setRokerPoint(valueX, valueY, mouseBeginPoint, image);
		}
		else if (valueX <= 0 && valueY <= 0) {
			m_pDegrees = Math.atan(Math.abs(valueY) / Math.abs(valueX)) * 180 / Math.PI + 180;
			this.setRokerPoint(valueX, valueY, mouseBeginPoint, image);

		}
		else if (valueX >= 0 && valueY <= 0) {
			m_pDegrees = Math.atan(valueX / Math.abs(valueY)) * 180 / Math.PI + 270;
			this.setRokerPoint(valueX, valueY, mouseBeginPoint, image);
		}
		this.m_pDegrees = m_pDegrees;
		// let playerController = MapManager.getInstance().getPlaerController();
		// playerController.rockerAngle = m_pDegrees;
		//4右 1下 2左 3上 5左上 6右上 7右下 8左下
		if (Math.abs(valueX) > 1 || Math.abs(valueY) > 1) {
			// let player = MapManager.getInstance().getPlayer();
			// if (this.m_pNowDirection == 4 && player.actionBeforeStop == RoleDirection.RIGHT&&playr.action!=RoleDirection.RIGHT) {
			// 	if (this.m_pDegrees > 230 && this.m_pDegrees <= 330) {
			// 			this.sandDirectionMsg(3, RoleDirection.UP);
			// 	} else if (this.m_pDegrees > 130 && this.m_pDegrees <= 230) {
			// 			this.sandDirectionMsg(2, RoleDirection.LEFT);
			// 	} else if (this.m_pDegrees > 30 && this.m_pDegrees <= 130) {
			// 			this.sandDirectionMsg(1, RoleDirection.DOWN);
			// 	}
			// } else
			// 	if (this.m_pNowDirection == 1 && player.actionBeforeStop == RoleDirection.DOWN&&playr.action!=RoleDirection.DOWN) {
			// 		if (this.m_pDegrees > 120 && this.m_pDegrees <= 220) {
			// 				this.sandDirectionMsg(2, RoleDirection.LEFT);
			// 		} else
			// 			if (this.m_pDegrees > 220 && this.m_pDegrees <= 320) {
			// 					this.sandDirectionMsg(3, RoleDirection.UP);
			// 			} else
			// 				if (this.m_pDegrees > 320 && this.m_pDegrees <= 360 || this.m_pDegrees >= 0 && this.m_pDegrees <= 60) {
			// 						this.sandDirectionMsg(4, RoleDirection.RIGHT);
			// 				}
			// 	} else
			// 		if (this.m_pNowDirection == 2 && player.actionBeforeStop == RoleDirection.LEFT&&playr.action!=RoleDirection.LEFT) {
			// 			if (this.m_pDegrees > 210 && this.m_pDegrees <= 310) {
			// 					this.sandDirectionMsg(3, RoleDirection.UP);
			// 			} else
			// 				if (this.m_pDegrees > 310 && this.m_pDegrees <= 360 || this.m_pDegrees >= 0 && this.m_pDegrees <= 50) {
			// 						this.sandDirectionMsg(4, RoleDirection.RIGHT);
			// 				} else
			// 					if (this.m_pDegrees > 50 && this.m_pDegrees <= 150) {
			// 							this.sandDirectionMsg(1, RoleDirection.DOWN);
			// 					}
			// 		}
			// 		else
			// 			if (this.m_pNowDirection == 3 && player.actionBeforeStop == RoleDirection.UP&&playr.action!=RoleDirection.UP) {
			// 				if (this.m_pDegrees > 300 && this.m_pDegrees <= 360 || this.m_pDegrees >= 0 && this.m_pDegrees <= 40) {
			// 						this.sandDirectionMsg(4, RoleDirection.RIGHT);
			// 				} else
			// 					if (this.m_pDegrees > 40 && this.m_pDegrees <= 140) {
			// 							this.sandDirectionMsg(1, RoleDirection.DOWN);
			// 					} else
			// 						if (this.m_pDegrees > 140 && this.m_pDegrees <= 240) {
			// 								this.sandDirectionMsg(2, RoleDirection.LEFT);
			// 						}

			// 			} else

			// if (this.m_pDegrees >= 315 && this.m_pDegrees <= 360 || this.m_pDegrees >= 0 && this.m_pDegrees < 45) {
			// 	if (this.m_pNowDirection != 4) {
			// 		this.sandDirectionMsg(4, RoleDirection.RIGHT);
			// 	}
			// }
			// else if (this.m_pDegrees >= 45 && this.m_pDegrees < 135 && this.m_pNowDirection != 1) {
			// 	this.sandDirectionMsg(1, RoleDirection.DOWN);
			// }
			// else if (this.m_pDegrees >= 135 && this.m_pDegrees < 225 && this.m_pNowDirection != 2) {
			// 	this.sandDirectionMsg(2, RoleDirection.LEFT);
			// }
			// else if (this.m_pDegrees >= 225 && this.m_pDegrees < 315 && this.m_pNowDirection != 3) {
			// 	this.sandDirectionMsg(3, RoleDirection.UP);
			// }
			//新的8方位 4右 1下 2左 3上 5左上 6右上 7右下 8左下
			if (this.m_pDegrees >= this.rightUP2 && this.m_pDegrees <= 360 || this.m_pDegrees >= 0 && this.m_pDegrees < this.rightDown1) {
				if (this.m_pNowDirection != 4) {
					this.sandDirectionMsg(4, InputType.RIGHT);
				}
			} else if (this.m_pDegrees >= this.rightDown1 && this.m_pDegrees < this.rightDown2 && this.m_pNowDirection != 7) {
				this.sandDirectionMsg(7, InputType.RIGHT_DOWN);
			}

			else if (this.m_pDegrees >= this.rightDown2 && this.m_pDegrees < this.leftDown1 && this.m_pNowDirection != 1) {
				this.sandDirectionMsg(1, InputType.DOWN);
			} else if (this.m_pDegrees >= this.leftDown1 && this.m_pDegrees < this.leftDown2 && this.m_pNowDirection != 8) {
				this.sandDirectionMsg(8, InputType.LEFT_DOWN);
			}

			else if (this.m_pDegrees >= this.leftDown2 && this.m_pDegrees < this.leftUP1 && this.m_pNowDirection != 2) {
				this.sandDirectionMsg(2, InputType.LEFT);
			}
			else if (this.m_pDegrees >= this.leftUP1 && this.m_pDegrees < this.leftUP2 && this.m_pNowDirection != 5) {
				this.sandDirectionMsg(5, InputType.LEFT_UP);
			}
			else if (this.m_pDegrees >= this.leftUP2 && this.m_pDegrees < this.rightUP1 && this.m_pNowDirection != 3) {
				this.sandDirectionMsg(3, InputType.UP);
			} else if (this.m_pDegrees >= this.rightUP1 && this.m_pDegrees < this.rightUP2 && this.m_pNowDirection != 6) {
				this.sandDirectionMsg(6, InputType.RIGHT_UP);
			}

			// if (this.m_pDegrees >= 337.5 && this.m_pDegrees <= 360 || this.m_pDegrees >= 0 && this.m_pDegrees < 22.5) {
			// 	if (this.m_pNowDirection != 4) {
			// 		this.sandDirectionMsg(4, RoleDirection.RIGHT);
			// 	}
			// } else if (this.m_pDegrees >= 22.5 && this.m_pDegrees < 67.5 && this.m_pNowDirection != 7) {
			// 	this.sandDirectionMsg(7, RoleDirection.RIGHT_DOWN);
			// }

			// else if (this.m_pDegrees >= 67.5 && this.m_pDegrees < 112.5 && this.m_pNowDirection != 1) {
			// 	this.sandDirectionMsg(1, RoleDirection.DOWN);
			// } else if (this.m_pDegrees >= 112.5 && this.m_pDegrees < 157.5 && this.m_pNowDirection != 8) {
			// 	this.sandDirectionMsg(8, RoleDirection.LEFT_DOWN);
			// }

			// else if (this.m_pDegrees >= 157.5 && this.m_pDegrees < 202.5 && this.m_pNowDirection != 2) {
			// 	this.sandDirectionMsg(2, RoleDirection.LEFT);
			// }
			// else if (this.m_pDegrees >= 202.5 && this.m_pDegrees < 247.5 && this.m_pNowDirection != 5) {
			// 	this.sandDirectionMsg(5, RoleDirection.LEFT_UP);
			// }
			// else if (this.m_pDegrees >= 247.5 && this.m_pDegrees < 292.5 && this.m_pNowDirection != 3) {
			// 	this.sandDirectionMsg(3, RoleDirection.UP);
			// } else if (this.m_pDegrees >= 292.5 && this.m_pDegrees < 337.5 && this.m_pNowDirection != 6) {
			// 	this.sandDirectionMsg(6, RoleDirection.RIGHT_UP);
			// }
		}


	}

	/**摇杆的显示算法 */
	private setRokerPoint(valueX: number, valueY: number, mouseBeginPoint: egret.Point, image: eui.Image) {
		let setX = 0;
		let setY = 0;
		let setZ = 0;
		setZ = Math.sqrt(Math.pow(Math.abs(valueX), 2) + Math.pow(Math.abs(valueY), 2));
		let valueNum = setZ / this.m_pMoveDistance;
		setX = valueX / valueNum;
		setY = valueY / valueNum;
		if (setZ <= this.m_pMoveDistance) {
			setX = valueX;
			setY = valueY;
		}
		image.x = mouseBeginPoint.x + setX;
		image.y = mouseBeginPoint.y + setY;
	}
	private sandDirectionMsg(direction: number, roleDirection: number) {
		this.m_pSaveDegrees = this.m_pDegrees;
		this.m_pNowDirection = direction;
		core.InputManager.getInstance().sendKey(roleDirection);
	}
	// /**抬起方向算法 */
	// public upRoker(mouseUpPoint: egret.Point, mouseBeginPoint: egret.Point) {
	// 	let valueX = mouseUpPoint.x - mouseBeginPoint.x;
	// 	let valueY = mouseUpPoint.y - mouseBeginPoint.y;
	// 	/**获取玩家信息 */
	// 	let playr = MapManager.getInstance().getPlayer();
	// 	let m_pDegrees = 0;
	// 	if (valueX == 0 && valueY == 0) {
	// 		return;
	// 	}
	// 	else if (valueX >= 0 && valueY >= 0) {
	// 		m_pDegrees = Math.atan(valueY / valueX) * 180 / Math.PI;
	// 	}
	// 	else if (valueX <= 0 && valueY >= 0) {
	// 		m_pDegrees = Math.atan(Math.abs(valueX) / valueY) * 180 / Math.PI + 90;
	// 	}
	// 	else if (valueX <= 0 && valueY <= 0) {
	// 		m_pDegrees = Math.atan(Math.abs(valueY) / Math.abs(valueX)) * 180 / Math.PI + 180;
	// 	}
	// 	else if (valueX >= 0 && valueY <= 0) {
	// 		m_pDegrees = Math.atan(valueX / Math.abs(valueY)) * 180 / Math.PI + 270;
	// 	}
	// 	//4右 1下 2左 3上 5左上 6右上 7右下 8左下
	// 	if (Math.abs(valueX) > 1 || Math.abs(valueY) > 1) {
	// 		if (m_pDegrees >= this.rightUP2 && m_pDegrees <= 360 || m_pDegrees >= 0 && m_pDegrees < this.rightDown1) {

	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.RIGHT);

	// 		} else if (m_pDegrees >= this.rightDown1 && m_pDegrees < this.rightDown2) {
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.RIGHT_DOWN);
	// 		}
	// 		else if (m_pDegrees >= this.rightDown2 && m_pDegrees < this.leftDown1) {
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.DOWN);

	// 		} else if (m_pDegrees >= this.leftDown1 && m_pDegrees < this.leftDown2) {
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.LEFT_DOWN);

	// 		}

	// 		else if (m_pDegrees >= this.leftDown2 && m_pDegrees < this.leftUP1 ){
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.LEFT);

	// 		}
	// 		else if (m_pDegrees >= this.leftUP1 && m_pDegrees < this.leftUP2) {
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.LEFT_UP);

	// 		}
	// 		else if (m_pDegrees >= this.leftUP2 && m_pDegrees < this.rightUP1) {
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.UP);

	// 		} else if (m_pDegrees >= this.rightUP1 && m_pDegrees < this.rightUP2) {
	// 			EventCenter.instance.sendMsg(MapEvent.TOUCHBG_MSG_UP, RoleDirection.RIGHT_UP);

	// 		}
	// 	}
	// }

	public setRokerCentre(mouseBeginPoint: egret.Point, mouseMovePoint: egret.Point, rokerBgImg: eui.Image, rokerImage: eui.Image) {
		let valueX = mouseMovePoint.x - mouseBeginPoint.x;
		let valueY = mouseMovePoint.y - mouseBeginPoint.y;
		let m_pDegrees = 0;
		let setX = 0;
		let setY = 0;
		let setZ = 0;
		setZ = Math.sqrt(Math.pow(Math.abs(valueX), 2) + Math.pow(Math.abs(valueY), 2));
		let valueNum = setZ / this.m_pMoveMinDistance;
		setX = valueX / valueNum;
		setY = valueY / valueNum;
		rokerBgImg.x = mouseBeginPoint.x;
		rokerBgImg.y = mouseBeginPoint.y;
		if (valueX == 0 && valueY == 0) {
			return;
		}
		else if (valueX >= 0 && valueY >= 0) {
			let nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
			if (mouseBeginPoint.x < nextX + mouseBeginPoint.x) {
				if (mouseBeginPoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				} else if (mouseMovePoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				}


			}
			let nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
			if (mouseBeginPoint.y < nextY + mouseBeginPoint.y) {
				if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				} else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				}

			}
		}
		else if (valueX <= 0 && valueY >= 0) {
			let nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
			if (mouseBeginPoint.x > nextX + mouseBeginPoint.x) {
				if (mouseBeginPoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				} else if (mouseMovePoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				}
			}
			let nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
			if (mouseBeginPoint.y < nextY + mouseBeginPoint.y) {
				if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				} else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				}
			}


		}
		else if (valueX <= 0 && valueY <= 0) {
			let nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
			if (mouseBeginPoint.x > nextX + mouseBeginPoint.x) {
				if (mouseBeginPoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				} else if (mouseMovePoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				}
			}
			let nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
			if (mouseBeginPoint.y > nextY + mouseBeginPoint.y) {
				if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				} else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				}
			}

		}
		else if (valueX >= 0 && valueY <= 0) {
			let nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
			if (mouseBeginPoint.x < nextX + mouseBeginPoint.x) {
				if (mouseBeginPoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				} else if (mouseMovePoint.x > this.leftGap) {
					mouseBeginPoint.x += nextX;
					rokerImage.x += nextX;
				}
			}
			let nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
			if (mouseBeginPoint.y > nextY + mouseBeginPoint.y) {
				if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				} else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
					mouseBeginPoint.y += nextY;
					rokerImage.y += nextY;
				}
			}
		}
	}
}








