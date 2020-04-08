module managers {
    export class Collision {
        // Access Aligned Bounding Boxes
        public static AABBCheck(object1: objects.GameObject | objects.GameObjectSprite, object2: objects.GameObject | objects.GameObjectSprite) {
            let object1Offset = new objects.Vector2(0, 0);
            let object2Offset = new objects.Vector2(0, 0);

            if (object1.isCentered) {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }

            if (object2.isCentered) {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }

            // o1.position - ob1offset
            let object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            let object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);

            if (object1TopLeft.x < object2TopLeft.x + object2.width
                && object1TopLeft.x + object1.width > object2TopLeft.x
                && object1TopLeft.y < object2TopLeft.y + object2.height
                && object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                }
            } else {
                object2.isColliding = false;

            }

        }
    }
}