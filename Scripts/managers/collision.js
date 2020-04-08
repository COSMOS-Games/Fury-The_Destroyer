"use strict";
/**
 * COSMOS Games
 *
 * April 12, 2020
 *
 * Contributors:
 * - Logan J. Kim
 * - Kei Mizubuchi
 * - Hang Li
 * - Ygor Almeida
 *
 * Description:
 * Fury, the Destroyers, is two players single screen submarine game which is designed to bring joys
 * to number of people who play this game. This game will contain three stages.
 * Players level up once the stage is cleared by meeting all conditions including eliminating all enemies on a map.
 *
 * Versions:
 * - v4.0 Final Release
 * - v3.0 Beta Release
 * - v2.0 Alpha Release
 * - v1.0 Pre-Alpha Release
 */
var managers;
(function (managers) {
    /**
     * Class to manage all collision
     *
     * @export
     * @class Collision
     */
    class Collision {
        /**
         * Method to check AABB Collision by accessing aligned bounding boxes
         *
         * @static
         * @param {(objects.GameObject | objects.GameObjectSprite)} object1
         * @param {(objects.GameObject | objects.GameObjectSprite)} object2
         * @memberof Collision
         */
        static AABBCheck(object1, object2) {
            let object1Offset = new objects.Vector2(0, 0);
            let object2Offset = new objects.Vector2(0, 0);
            // check if object1 is centered
            if (object1.isCentered) {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }
            // check if object1 is centered
            if (object2.isCentered) {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }
            // o1.position - ob1offset
            let object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            let object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);
            // AABB Collision Detection
            if (object1TopLeft.x < object2TopLeft.x + object2.width
                && object1TopLeft.x + object1.width > object2TopLeft.x
                && object1TopLeft.y < object2TopLeft.y + object2.height
                && object1TopLeft.y + object1.height > object2TopLeft.y) {
                // if collide, change status
                if (!object2.isColliding) {
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
        }
    }
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map