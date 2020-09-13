import { Vector3 } from './three.module.js'

export default class Integrator {

    constructor(dt) {
        this.tmpP = new Vector3();
        this.tmpV = new Vector3();
        this.dt = dt;
        this.invdt = 1 / dt;
    }

    reset() {
        // smarter verlet integration https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_cloth.html#L126
        this.tmpP.set(0, 0, 0);
        this.tmpV.set(0, 0, 0);
    }

    doVerlet(pos, pPos, acc) {
        const nextP = this.tmpP.addScaledVector(pos, 2).sub(pPos).addScaledVector(acc, Math.pow(this.dt, 2));
        const nextV = this.tmpV.subVectors(pos, pPos).
            multiplyScalar(this.invdt);
        this.reset();
        return { nextP, nextV };
    }

    doEuler(pos, vel, acc) {
        const nextP = this.tmpP.add(pos).addScaledVector(vel, this.dt)
        const nextV = this.tmpV.add(vel).addScaledVector(acc, this.dt);
        this.reset();
        return { nextP, nextV };
    }
}