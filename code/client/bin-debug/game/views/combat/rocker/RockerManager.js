var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RockerManager = (function () {
    function RockerManager() {
        /**摇杆的移动距离 */
        this.m_pMoveDistance = 90;
        /**拖动的最低触发距离 */
        this.m_pMoveMinDistance = 170;
        /**角度 */
        this.m_pDegrees = 0;
        /**控制事件的条件 */
        this.m_pNowDirection = 100;
        this.m_pSaveDegrees = 0;
        this.m_pErrorNum = 3;
        /**左间隙 */
        this.leftGap = 180;
        /**顺时针排序****************** */
        this.rightUP1 = 295;
        this.rightUP2 = 335;
        this.rightDown1 = 25;
        this.rightDown2 = 65;
        this.leftDown1 = 115;
        this.leftDown2 = 155;
        this.leftUP1 = 205;
        this.leftUP2 = 245;
    }
    Object.defineProperty(RockerManager, "getInstance", {
        /***************************** */
        /**RockerManager单例*/
        get: function () {
            if (!RockerManager._instance) {
                RockerManager._instance = new RockerManager();
            }
            return RockerManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**方向算法 */
    RockerManager.prototype.moveRoker = function (mouseMovePoint, mouseBeginPoint, image) {
        var valueX = mouseMovePoint.x - mouseBeginPoint.x;
        var valueY = mouseMovePoint.y - mouseBeginPoint.y;
        /**获取玩家信息 */
        // let playr = MapManager.getInstance().getPlayer();
        var m_pDegrees = 0;
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
            }
            else if (this.m_pDegrees >= this.rightDown1 && this.m_pDegrees < this.rightDown2 && this.m_pNowDirection != 7) {
                this.sandDirectionMsg(7, InputType.RIGHT_DOWN);
            }
            else if (this.m_pDegrees >= this.rightDown2 && this.m_pDegrees < this.leftDown1 && this.m_pNowDirection != 1) {
                this.sandDirectionMsg(1, InputType.DOWN);
            }
            else if (this.m_pDegrees >= this.leftDown1 && this.m_pDegrees < this.leftDown2 && this.m_pNowDirection != 8) {
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
            }
            else if (this.m_pDegrees >= this.rightUP1 && this.m_pDegrees < this.rightUP2 && this.m_pNowDirection != 6) {
                this.sandDirectionMsg(6, InputType.RIGHT_UP);
            }
        }
    };
    /**摇杆的显示算法 */
    RockerManager.prototype.setRokerPoint = function (valueX, valueY, mouseBeginPoint, image) {
        var setX = 0;
        var setY = 0;
        var setZ = 0;
        setZ = Math.sqrt(Math.pow(Math.abs(valueX), 2) + Math.pow(Math.abs(valueY), 2));
        var valueNum = setZ / this.m_pMoveDistance;
        setX = valueX / valueNum;
        setY = valueY / valueNum;
        if (setZ <= this.m_pMoveDistance) {
            setX = valueX;
            setY = valueY;
        }
        image.x = mouseBeginPoint.x + setX;
        image.y = mouseBeginPoint.y + setY;
    };
    RockerManager.prototype.sandDirectionMsg = function (direction, roleDirection) {
        this.m_pSaveDegrees = this.m_pDegrees;
        this.m_pNowDirection = direction;
        core.InputManager.getInstance().sendKey(roleDirection);
    };
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
    RockerManager.prototype.setRokerCentre = function (mouseBeginPoint, mouseMovePoint, rokerBgImg, rokerImage) {
        var valueX = mouseMovePoint.x - mouseBeginPoint.x;
        var valueY = mouseMovePoint.y - mouseBeginPoint.y;
        var m_pDegrees = 0;
        var setX = 0;
        var setY = 0;
        var setZ = 0;
        setZ = Math.sqrt(Math.pow(Math.abs(valueX), 2) + Math.pow(Math.abs(valueY), 2));
        var valueNum = setZ / this.m_pMoveMinDistance;
        setX = valueX / valueNum;
        setY = valueY / valueNum;
        rokerBgImg.x = mouseBeginPoint.x;
        rokerBgImg.y = mouseBeginPoint.y;
        if (valueX == 0 && valueY == 0) {
            return;
        }
        else if (valueX >= 0 && valueY >= 0) {
            var nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
            if (mouseBeginPoint.x < nextX + mouseBeginPoint.x) {
                if (mouseBeginPoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
                else if (mouseMovePoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
            }
            var nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
            if (mouseBeginPoint.y < nextY + mouseBeginPoint.y) {
                if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
                else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
            }
        }
        else if (valueX <= 0 && valueY >= 0) {
            var nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
            if (mouseBeginPoint.x > nextX + mouseBeginPoint.x) {
                if (mouseBeginPoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
                else if (mouseMovePoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
            }
            var nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
            if (mouseBeginPoint.y < nextY + mouseBeginPoint.y) {
                if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
                else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
            }
        }
        else if (valueX <= 0 && valueY <= 0) {
            var nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
            if (mouseBeginPoint.x > nextX + mouseBeginPoint.x) {
                if (mouseBeginPoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
                else if (mouseMovePoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
            }
            var nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
            if (mouseBeginPoint.y > nextY + mouseBeginPoint.y) {
                if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
                else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
            }
        }
        else if (valueX >= 0 && valueY <= 0) {
            var nextX = mouseMovePoint.x - (mouseBeginPoint.x + setX);
            if (mouseBeginPoint.x < nextX + mouseBeginPoint.x) {
                if (mouseBeginPoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
                else if (mouseMovePoint.x > this.leftGap) {
                    mouseBeginPoint.x += nextX;
                    rokerImage.x += nextX;
                }
            }
            var nextY = mouseMovePoint.y - (mouseBeginPoint.y + setY);
            if (mouseBeginPoint.y > nextY + mouseBeginPoint.y) {
                if (mouseBeginPoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
                else if (mouseMovePoint.y < core.LayerCenter.stageHeight - this.leftGap) {
                    mouseBeginPoint.y += nextY;
                    rokerImage.y += nextY;
                }
            }
        }
    };
    return RockerManager;
}());
__reflect(RockerManager.prototype, "RockerManager");
//# sourceMappingURL=RockerManager.js.map