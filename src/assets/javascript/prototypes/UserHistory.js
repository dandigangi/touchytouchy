
// Data
// TODO: Backend storage (thinking MongoDB)
// TODO: Move data structures into ImmutableJS (once stored ^)
window.UserHistory = function() {
    this.create();
    return this;
}

// Inits a new event history if one does not exist or the previous is destroyed
UserHistory.prototype.create = function() {
    this.storage = {
        events: [],
        total: 0
    }

    return this;
}

// Destory the current event history and create() another
UserHistory.prototype.destroy = function() {

    if(this.storage && this.storage.events.length || this.storage.total > 0) {
        this.storage = null;
        this.create();
    }

    return this;
}

// Store a new event in the user's event history
UserHistory.prototype.store = function(newEvent) {

    if(!this.storage) {
        this.create();
    }

    this.storage.total++;
    newEvent.id = this.get('total');
    this.storage.events.push(newEvent);
    return this;
}

UserHistory.prototype.get = function(key) {
    if(this.storage && _.has(this.storage, key)) {
        return this.storage[key];
    }
}

UserHistory.prototype.getFirstEvent = function() {
    return this.get('events').splice(0, 1);
}

UserHistory.prototype.getLastEvent = function() {
    return this.get('events').splice(-1, 1);
}
