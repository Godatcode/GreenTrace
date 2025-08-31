"""
Carbon credit views for GreenTrace.
"""
from django.views.generic import ListView, CreateView, UpdateView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.shortcuts import redirect
from .models import CarbonCredit


class CarbonCreditListView(LoginRequiredMixin, ListView):
    """Display list of carbon credits."""
    model = CarbonCredit
    template_name = 'carbon_credits/credit_list.html'
    context_object_name = 'credits'
    
    def get_queryset(self):
        """Filter credits based on user role."""
        queryset = CarbonCredit.objects.all()
        
        # Apply privacy filters based on user role
        if not self.request.user.is_staff:
            # Regular users see only verified credits
            queryset = queryset.filter(verification_status='verified')
        
        return queryset


class CarbonCreditIssueView(LoginRequiredMixin, CreateView):
    """Issue new carbon credits."""
    model = CarbonCredit
    template_name = 'carbon_credits/credit_form.html'
    fields = [
        'amount', 'unit', 'recipient', 'description', 'carbon_offset',
        'verification_status'
    ]
    success_url = reverse_lazy('credit_list')
    
    def form_valid(self, form):
        """Set the issuer field to current user."""
        form.instance.issuer = self.request.user.username
        form.instance.status = 'issued'
        return super().form_valid(form)


class CarbonCreditDetailView(LoginRequiredMixin, DetailView):
    """Display carbon credit details."""
    model = CarbonCredit
    template_name = 'carbon_credits/credit_detail.html'
    context_object_name = 'credit'


class CarbonCreditTransferView(LoginRequiredMixin, UpdateView):
    """Transfer carbon credits."""
    model = CarbonCredit
    template_name = 'carbon_credits/credit_transfer.html'
    fields = ['recipient', 'amount']
    success_url = reverse_lazy('credit_list')
    
    def form_valid(self, form):
        """Update status to transferred."""
        form.instance.status = 'transferred'
        return super().form_valid(form)


class CarbonCreditRetireView(LoginRequiredMixin, UpdateView):
    """Retire carbon credits."""
    model = CarbonCredit
    template_name = 'carbon_credits/credit_retire.html'
    fields = ['reason']
    success_url = reverse_lazy('credit_list')
    
    def form_valid(self, form):
        """Update status to retired."""
        form.instance.status = 'retired'
        return super().form_valid(form)
