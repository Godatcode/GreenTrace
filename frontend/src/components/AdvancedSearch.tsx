import React, { useState, useMemo, useCallback } from 'react';
import IconSystem from './IconSystem';

interface Product {
  id: string;
  name: string;
  batchId: string;
  certification: string;
  carbonActivity: string;
  location: string;
  producer: string;
  timestamp: number;
  complianceScore?: number;
  isCompliant?: boolean;
}

interface AdvancedSearchProps {
  products: Product[];
  onSearch: (filteredProducts: Product[]) => void;
  onClear: () => void;
}

interface SearchFilters {
  text: string;
  certification: string;
  location: string;
  producer: string;
  complianceStatus: string;
  dateRange: {
    start: string;
    end: string;
  };
  carbonActivity: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  products,
  onSearch,
  onClear
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    text: '',
    certification: '',
    location: '',
    producer: '',
    complianceStatus: '',
    dateRange: {
      start: '',
      end: ''
    },
    carbonActivity: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'compliance' | 'carbon'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Get unique values for filter options
  const uniqueValues = useMemo(() => ({
    certifications: Array.from(new Set(products.map(p => p.certification).filter(Boolean))),
    locations: Array.from(new Set(products.map(p => p.location).filter(Boolean))),
    producers: Array.from(new Set(products.map(p => p.producer).filter(Boolean))),
    carbonActivities: Array.from(new Set(products.map(p => p.carbonActivity).filter(Boolean)))
  }), [products]);

  // Apply filters and search
  const applyFilters = useCallback(() => {
    let filtered = products.filter(product => {
      // Text search across multiple fields
      if (filters.text) {
        const searchText = filters.text.toLowerCase();
        const searchableFields = [
          product.name,
          product.batchId,
          product.location,
          product.producer,
          product.carbonActivity
        ].join(' ').toLowerCase();
        
        if (!searchableFields.includes(searchText)) {
          return false;
        }
      }

      // Certification filter
      if (filters.certification && product.certification !== filters.certification) {
        return false;
      }

      // Location filter
      if (filters.location && product.location !== filters.location) {
        return false;
      }

      // Producer filter
      if (filters.producer && product.producer !== filters.producer) {
        return false;
      }

      // Compliance status filter
      if (filters.complianceStatus) {
        if (filters.complianceStatus === 'compliant' && !product.isCompliant) {
          return false;
        }
        if (filters.complianceStatus === 'non-compliant' && product.isCompliant) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const productDate = new Date(product.timestamp * 1000);
        if (filters.dateRange.start) {
          const startDate = new Date(filters.dateRange.start);
          if (productDate < startDate) return false;
        }
        if (filters.dateRange.end) {
          const endDate = new Date(filters.dateRange.end);
          if (productDate > endDate) return false;
        }
      }

      // Carbon activity filter
      if (filters.carbonActivity && product.carbonActivity !== filters.carbonActivity) {
        return false;
      }

      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = a.timestamp;
          bValue = b.timestamp;
          break;
        case 'compliance':
          aValue = a.complianceScore || 0;
          bValue = b.complianceScore || 0;
          break;
        case 'carbon':
          aValue = a.carbonActivity;
          bValue = b.carbonActivity;
          break;
        default:
          aValue = a.timestamp;
          bValue = b.timestamp;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    onSearch(filtered);
  }, [filters, products, sortBy, sortOrder, onSearch]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      text: '',
      certification: '',
      location: '',
      producer: '',
      complianceStatus: '',
      dateRange: { start: '', end: '' },
      carbonActivity: ''
    });
    setSortBy('date');
    setSortOrder('desc');
    onClear();
  };

  // Update filter and auto-apply
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Auto-apply filters after a short delay
    setTimeout(() => {
      if (JSON.stringify(newFilters) === JSON.stringify(filters)) {
        applyFilters();
      }
    }, 300);
  };

  return (
    <div className="advanced-search">
      <div className="search-header">
        <h3 className="search-title">
          <IconSystem name="search" size="sm" />
          Advanced Search & Filters
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-toggle"
        >
          <IconSystem name={isExpanded ? 'up' : 'down'} size="sm" />
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Quick Search Bar */}
      <div className="quick-search">
        <div className="search-input-wrapper">
          <IconSystem name="search" size="sm" />
          <input
            type="text"
            placeholder="Search products, batch IDs, locations, producers..."
            value={filters.text}
            onChange={(e) => updateFilter('text', e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={applyFilters} className="search-btn">
          Search
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="advanced-filters">
          <div className="filters-grid">
            {/* Certification Filter */}
            <div className="filter-group">
              <label>Certification</label>
              <select
                value={filters.certification}
                onChange={(e) => updateFilter('certification', e.target.value)}
              >
                <option value="">All Certifications</option>
                {uniqueValues.certifications.map(cert => (
                  <option key={cert} value={cert}>{cert}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="filter-group">
              <label>Location</label>
              <select
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {uniqueValues.locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Producer Filter */}
            <div className="filter-group">
              <label>Producer</label>
              <select
                value={filters.producer}
                onChange={(e) => updateFilter('producer', e.target.value)}
              >
                <option value="">All Producers</option>
                {uniqueValues.producers.map(prod => (
                  <option key={prod} value={prod}>{prod}</option>
                ))}
              </select>
            </div>

            {/* Compliance Status Filter */}
            <div className="filter-group">
              <label>Compliance Status</label>
              <select
                value={filters.complianceStatus}
                onChange={(e) => updateFilter('complianceStatus', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
              </select>
            </div>

            {/* Date Range Filters */}
            <div className="filter-group">
              <label>Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label>End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
              />
            </div>

            {/* Carbon Activity Filter */}
            <div className="filter-group">
              <label>Carbon Activity</label>
              <select
                value={filters.carbonActivity}
                onChange={(e) => updateFilter('carbonActivity', e.target.value)}
              >
                <option value="">All Activities</option>
                {uniqueValues.carbonActivities.map(activity => (
                  <option key={activity} value={activity}>{activity}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="sorting-options">
            <div className="sort-group">
              <label>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="compliance">Compliance Score</option>
                <option value="carbon">Carbon Activity</option>
              </select>
            </div>

            <div className="sort-group">
              <label>Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="filter-actions">
            <button onClick={applyFilters} className="apply-filters-btn">
              <IconSystem name="search" size="sm" />
              Apply Filters
            </button>
            <button onClick={clearFilters} className="clear-filters-btn">
              <IconSystem name="close" size="sm" />
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
