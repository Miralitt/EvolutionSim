class Bone {
  constructor(id, parent = null) {
    this.id = id;
    this.parent = parent;
    this.length = Math.random() * 50 + 10; // length between 10 and 60
    this.angle = Math.random() * Math.PI * 2; // angle in radians
    this.position = this.calculatePosition(); // absolute position
  }

  calculatePosition() {
    if (!this.parent) {
      // Root bone at random world position
      return {
        x: Math.random() * 800,
        y: Math.random() * 600
      };
    } else {
      // Position is relative to the end of the parent bone
      const parentEnd = {
        x: this.parent.position.x + Math.cos(this.parent.angle) * this.parent.length,
        y: this.parent.position.y + Math.sin(this.parent.angle) * this.parent.length
      };
      return parentEnd;
    }
  }
}

class Creature {
  constructor() {
    this.bones = [];
    this.generateBones();
  }

  generateBones() {
    // Create root bone
    const root = new Bone(0);
    this.bones.push(root);

    // Create 4 additional bones, each attached to a previous bone
    for (let i = 1; i < 5; i++) {
      const parent = this.bones[Math.floor(Math.random() * i)]; // pick any existing bone
      const bone = new Bone(i, parent);
      this.bones.push(bone);
    }
  }
}



function drawCreature(ctx, creature) {
    ctx.strokeStyle = "#0f0";
    ctx.lineWidth = 4;

    for (const bone of creature.bones) {
      const start = bone.position;
      const end = bone.getEndPoint();

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // Optional: draw joints
      ctx.fillStyle = "#f00";
      ctx.beginPath();
      ctx.arc(start.x, start.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
}

function main() {
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const creature = new Creature();
drawCreature(ctx, creature);
}

window.onload = main;
