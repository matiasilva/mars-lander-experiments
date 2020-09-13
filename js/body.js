import { Vector3 } from './three.module.js'

class Body {
    constructor({ pos, vel, integrator, mesh }) {
        this.pos = pos.copy(new Vector3());
        this.vel = vel.copy(new Vector3());
        this.acc = new Vector3();
        this.mass = mass;
        this.invMass = 1 / this.mass;
        this.integrator = integrator;
        this.mesh = mesh;
        this.trajectory = [];

        this.accHelper = new Vector3();
    }

    applyForce(force) {
        this.acc.add(this.accHelper.addScaledVector(force, this.mass));
        this.accHelper.set(0, 0, 0);
    }

    update(t) {
        const { nextP, nextV } = t == 0 ? this.integrator.doEuler(this.pos, this.vel, this.acc) : this.integrator.doVerlet(this.pos, this.trajectory[this.trajectory.length - 1], this.acc);
        this.pos = nextP;
        this.vel = nextV;
        // three stuff
        this.mesh.position.copy(this.pos);
        this.acc.set(0, 0, 0);
    }
}

export default Body;