import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class ArcTrackAPITester:
    def __init__(self, base_url="https://arctrack-demo.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test_result(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test results for reporting"""
        result = {
            "test_name": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.utcnow().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name}: {details}")
        else:
            print(f"❌ {test_name}: {details}")
        
        self.tests_run += 1

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict = None, headers: Dict = None) -> tuple[bool, Any]:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = None
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            details = f"Status: {response.status_code} (Expected: {expected_status})"
            if not success:
                details += f", Response: {response.text[:200]}"
            
            self.log_test_result(name, success, details, response_data)
            return success, response_data

        except requests.exceptions.RequestException as e:
            error_msg = f"Request failed: {str(e)}"
            self.log_test_result(name, False, error_msg)
            return False, {"error": str(e)}
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            self.log_test_result(name, False, error_msg)
            return False, {"error": str(e)}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test("Root Endpoint", "GET", "", 200)

    def test_create_lead_valid(self):
        """Test creating a lead with valid data"""
        test_data = {
            "schoolName": "Test School Mumbai",
            "studentStrength": "501-800",
            "city": "Mumbai",
            "contactName": "Rajesh Kumar",
            "email": "rajesh.kumar@testschool.edu",
            "phone": "9876543210",
            "source": "Website Form"
        }
        
        return self.run_test("Create Lead (Valid)", "POST", "leads", 201, test_data)

    def test_create_lead_invalid_email(self):
        """Test creating a lead with invalid email"""
        test_data = {
            "schoolName": "Test School Delhi",
            "studentStrength": "301-500",
            "city": "Delhi",
            "contactName": "Priya Sharma",
            "email": "invalid-email",
            "phone": "9123456789",
            "source": "Website Form"
        }
        
        return self.run_test("Create Lead (Invalid Email)", "POST", "leads", 422, test_data)

    def test_create_lead_invalid_phone(self):
        """Test creating a lead with invalid phone"""
        test_data = {
            "schoolName": "Test School Chennai",
            "studentStrength": "201-300",
            "city": "Chennai",
            "contactName": "Amit Singh",
            "email": "amit.singh@testschool.edu",
            "phone": "123456789",  # Invalid - only 9 digits
            "source": "Website Form"
        }
        
        return self.run_test("Create Lead (Invalid Phone)", "POST", "leads", 422, test_data)

    def test_create_lead_missing_fields(self):
        """Test creating a lead with missing required fields"""
        test_data = {
            "schoolName": "Test School",
            "studentStrength": "",  # Missing
            "city": "",  # Missing
            "contactName": "",  # Missing
            "email": "",  # Missing
            "phone": ""  # Missing
        }
        
        return self.run_test("Create Lead (Missing Fields)", "POST", "leads", 422, test_data)

    def test_get_leads(self):
        """Test getting all leads"""
        return self.run_test("Get All Leads", "GET", "leads", 200)

    def test_get_specific_lead(self, lead_id: str):
        """Test getting a specific lead"""
        return self.run_test(f"Get Lead {lead_id}", "GET", f"leads/{lead_id}", 200)

    def test_get_nonexistent_lead(self):
        """Test getting a non-existent lead"""
        return self.run_test("Get Non-existent Lead", "GET", "leads/non-existent-id", 404)

    def run_all_tests(self):
        """Run comprehensive backend tests"""
        print("🚀 Starting ArcTrack API Testing...")
        print(f"Testing against: {self.api_url}")
        
        # Basic API tests
        self.test_health_check()
        self.test_root_endpoint()
        
        # Lead creation tests
        lead_success, lead_data = self.test_create_lead_valid()
        created_lead_id = None
        
        if lead_success and lead_data and 'id' in lead_data:
            created_lead_id = lead_data['id']
            print(f"Created lead ID: {created_lead_id}")
        
        # Validation tests
        self.test_create_lead_invalid_email()
        self.test_create_lead_invalid_phone()
        self.test_create_lead_missing_fields()
        
        # Lead retrieval tests
        self.test_get_leads()
        
        if created_lead_id:
            self.test_get_specific_lead(created_lead_id)
        
        self.test_get_nonexistent_lead()
        
        # Print summary
        print(f"\n📊 Backend API Test Results:")
        print(f"Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed/self.tests_run)*100 if self.tests_run > 0 else 0,
            "test_results": self.test_results,
            "created_lead_id": created_lead_id
        }

def main():
    """Main test execution"""
    tester = ArcTrackAPITester()
    results = tester.run_all_tests()
    
    # Save results to file for analysis
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\n💾 Results saved to /app/backend_test_results.json")
    
    # Return appropriate exit code
    return 0 if results["success_rate"] >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())