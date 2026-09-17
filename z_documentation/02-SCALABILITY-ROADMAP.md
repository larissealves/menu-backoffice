# 📈 Scalability & Performance Roadmap

## Objective

Use the project as a laboratory to understand how systems behave as **traffic, data volume, and system complexity increase**.

Each experiment should be measured and documented before and after the change.

---

## 1. Baseline

* [ ] Define endpoints for testing
* [ ] Measure response time
* [ ] Measure RPS
* [ ] Measure error rate
* [ ] Document current performance

## 2. Load Testing

* [ ] Learn and use **k6**
* [ ] Simulate increasing traffic
* [ ] Test different load levels
* [ ] Identify the current application limits
* [ ] Document bottlenecks

## 3. Database Performance

* [ ] Generate large amounts of data
* [ ] Analyze queries using `EXPLAIN`
* [ ] Identify slow queries
* [ ] Review and improve indexes
* [ ] Test connection pooling
* [ ] Compare performance before and after changes

## 4. Caching

* [ ] Test Redis caching
* [ ] Measure cache hit / miss
* [ ] Define TTL
* [ ] Test cache invalidation
* [ ] Compare performance with and without cache

## 5. Horizontal Scaling

* [ ] Run multiple backend instances
* [ ] Test load balancing
* [ ] Verify shared state
* [ ] Test Redis with multiple instances
* [ ] Compare single-instance and multi-instance performance

## 6. Failure & Resilience

* [ ] Simulate Redis unavailability
* [ ] Simulate database unavailability
* [ ] Simulate service failures
* [ ] Implement and test timeouts
* [ ] Implement and test retries
* [ ] Analyze system behavior during failures

## 7. Distributed Systems

* [ ] Identify service boundaries
* [ ] Separate Menu Service
* [ ] Separate Authentication Service
* [ ] Separate User Service
* [ ] Implement service-to-service communication
* [ ] Introduce API Gateway
* [ ] Test independent scaling
* [ ] Simulate failures between services

---

# 🧪 Experiment Documentation

Each experiment should document:

* **Problem**
* **Before**
* **Experiment**
* **After**
* **Metrics**
* **What I learned**
